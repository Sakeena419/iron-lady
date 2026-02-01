from typing import Dict, Optional
import uuid
import os
from litellm import completion


class ChatbotService:
    def __init__(self, knowledge_base):
        self.knowledge_base = knowledge_base
        self.conversations: Dict[str, list] = {}
        
        # Initialize configuration
        self.credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.agent_model = os.getenv("AGENT_MODEL", "gemini-2.5-pro")
        
        # Set credentials in environment for LiteLLM
        if self.credentials_path:
            if not os.path.isabs(self.credentials_path):
                self.credentials_path = os.path.abspath(self.credentials_path)
            
            if os.path.exists(self.credentials_path):
                os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = self.credentials_path
                print(f"✅ Google Cloud credentials configured")
                print(f"🤖 Model: vertex_ai/{self.agent_model}")
                print(f"🔑 Credentials: {self.credentials_path}")
                self.client_available = True
            else:
                print(f"⚠️  WARNING: Service account file not found at: {self.credentials_path}")
                print(f"⚠️  Using fallback responses.")
                self.client_available = False
        else:
            print("⚠️  WARNING: GOOGLE_APPLICATION_CREDENTIALS not found. Using fallback responses.")
            self.client_available = False
        
        self.system_prompt = self._build_system_prompt()
    
    def _build_system_prompt(self) -> str:
        """Build the system prompt with knowledge base context"""
        kb_context = self.knowledge_base.get_context()
        
        return f"""You are an AI assistant for Iron Lady - a bold, empowering organization with the mission of ELEVATING A MILLION WOMEN TO THE TOP through Business War Tactics and unapologetic winning mindsets.

BRAND VOICE & PERSONALITY:
- Bold, confident, and empowering (NOT soft or overly polite)
- Challenge limiting beliefs like "learn to balance" or "just adjust"
- Celebrate ambition unapologetically
- Use powerful phrases: "breakthrough", "win", "transform", "fast-track"
- Non-judgmental and celebration-focused
- Results-oriented and action-driven

YOUR ROLE:
1. Inspire women to embrace unapologetic ambition and winning mindsets
2. Help them find the RIGHT program for their breakthrough goals (C-suite, career growth, entrepreneurship)
3. Explain our Business War Tactics approach - winning WITHOUT others losing
4. Guide them through joining our 78,000+ Women Leaders' Ecosystem
5. Challenge their limiting beliefs and empower bold action

KNOWLEDGE BASE:
{kb_context}

KEY MESSAGING POINTS:
- Iron Lady is for women who refuse to "suffer", "just adjust", or "stop dreaming"
- We teach Business War Tactics for transformative results in minimal time
- Winning doesn't mean others need to lose!
- Our community includes professionals, entrepreneurs, and women restarting careers
- We're unconventional, risk-taking, and breakthrough-focused
- Learn from global practitioners, entrepreneurs, and award-winning CEOs

COMMUNICATION STYLE:
- Be direct, bold, and empowering (avoid phrases like "maybe" or "you might consider")
- Use confident language: "You CAN", "You WILL", "This is your breakthrough"
- Ask powerful questions about their ambitions and goals
- Challenge self-limiting beliefs when you hear them
- Celebrate their ambitions without judgment
- Share specific program benefits that match their goals

PROGRAM RECOMMENDATIONS:
- Leadership Essentials: For those feeling guilty about ambition, navigating office politics
- 100 Board Members: For those stuck at same career level needing breakthrough
- Master of Business Warfare: For serious C-suite aspirants and 1+ Crore income goals
- Business War Tactics: For fast results and winning mindset development
- Winning Mindset: For those needing mindset transformation and community support

CONTACT: +91-6360823123 | www.ironlady.com

Respond in a powerful, inspiring tone that makes women feel ready to conquer their goals!"""

    async def process_message(
        self,
        message: str,
        conversation_id: Optional[str] = None
    ) -> Dict:
        """Process user message and generate response"""
        
        # Create or retrieve conversation
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
            self.conversations[conversation_id] = []
        
        conversation = self.conversations.get(conversation_id, [])
        
        # Add user message to conversation history
        conversation.append({"role": "user", "content": message})
        
        # Generate response
        if self.client_available:
            try:
                response_text = await self._generate_gemini_response(conversation)
            except Exception as e:
                print(f"Gemini API error: {str(e)}")
                response_text = self._generate_fallback_response(message)
        else:
            response_text = self._generate_fallback_response(message)
        
        # Add assistant response to conversation
        conversation.append({"role": "assistant", "content": response_text})
        
        # Store updated conversation (keep last 10 messages for context)
        self.conversations[conversation_id] = conversation[-10:]
        
        return {
            "message": response_text,
            "conversation_id": conversation_id,
            "suggestions": self._generate_suggestions(message)
        }
    
    async def _generate_gemini_response(self, conversation: list) -> str:
        """Generate response using Google Gemini via LiteLLM"""
        # Prepare messages with system prompt
        messages = [
            {"role": "system", "content": self.system_prompt}
        ] + conversation
        
        # Call Gemini using LiteLLM
        response = completion(
            model=f"vertex_ai/{self.agent_model}",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content
    
    def _generate_fallback_response(self, message: str) -> str:
        """Generate fallback response when OpenAI is not available"""
        message_lower = message.lower()
        
        # Simple keyword-based responses
        if any(word in message_lower for word in ["program", "course", "offer", "available"]):
            return """**Our Programs:**

Iron Lady offers comprehensive leadership and professional development programs:

• **Leadership Excellence Program** - 12-week intensive leadership training
• **Professional Skills Development** - 8-week program covering communication, management, and strategy
• **Women in Tech Leadership** - 10-week program for tech industry leaders
• **Executive Coaching** - Personalized 1-on-1 mentorship

Would you like detailed information about any specific program?"""
        
        elif any(word in message_lower for word in ["enroll", "apply", "join", "sign up"]):
            return """**Enrollment Process:**

Getting started is easy:

1. **Explore Programs** - Review our course catalog
2. **Check Prerequisites** - Ensure you meet the requirements
3. **Submit Application** - Fill out our online application form
4. **Interview** - Schedule a brief conversation with our team
5. **Confirmation** - Receive acceptance and payment details

The entire process typically takes 1-2 weeks. Would you like help choosing the right program for you?"""
        
        elif any(word in message_lower for word in ["cost", "price", "fee", "tuition", "payment"]):
            return """**Program Pricing:**

Our programs are competitively priced to make leadership development accessible:

• Leadership Excellence: $2,500
• Professional Skills Development: $1,800
• Women in Tech Leadership: $2,200
• Executive Coaching: $3,500 (3 months)

**Financial Options:**
- Payment plans available
- Scholarships for qualifying candidates
- Group discounts for organizations

Would you like information about our scholarship program?"""
        
        elif any(word in message_lower for word in ["schedule", "duration", "time", "when"]):
            return """**Program Schedules:**

Our programs offer flexible scheduling:

• **Weekday Evening** - 6:00-8:30 PM (Monday & Wednesday)
• **Weekend Intensive** - Saturdays 9:00 AM - 4:00 PM
• **Online Self-Paced** - Complete on your schedule with live weekly sessions

Most programs run 8-12 weeks with 2-3 sessions per week. New cohorts start monthly.

What schedule works best for you?"""
        
        else:
            return """Thank you for your question! I'm here to help you learn about Iron Lady's programs and services.

I can assist you with:
• Program information and recommendations
• Enrollment process and requirements
• Scheduling and pricing details
• Career development guidance

What would you like to know more about?"""
    
    def _generate_suggestions(self, message: str) -> list:
        """Generate follow-up question suggestions based on user message"""
        message_lower = message.lower()
        
        if any(word in message_lower for word in ["program", "course"]):
            return [
                "What are the prerequisites?",
                "How long is the program?",
                "What's the cost?",
            ]
        elif any(word in message_lower for word in ["enroll", "apply"]):
            return [
                "What documents do I need?",
                "When does the next cohort start?",
                "Are there any scholarships available?",
            ]
        else:
            return [
                "Tell me about your programs",
                "How do I enroll?",
                "What makes Iron Lady unique?",
            ]
