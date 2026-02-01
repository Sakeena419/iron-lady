from typing import Dict, List


class KnowledgeBase:
    """
    Knowledge base containing information about Iron Lady programs and services
    """
    
    def __init__(self):
        self.programs = self._load_programs()
        self.faqs = self._load_faqs()
        self.enrollment_info = self._load_enrollment_info()
    
    def _load_programs(self) -> List[Dict]:
        """Load program information"""
        return [
            {
                "name": "Leadership Essentials Program",
                "duration": "Flexible cohort-based learning",
                "format": "Hybrid (Online + In-person workshops)",
                "price": "Contact for pricing",
                "description": "Are you often asked to 'Learn to BALANCE'? Do you feel 'Guilty' about being Ambitious? This program teaches you the art of maximizing, shameless pitching, and dealing with office politics and biases. Be unapologetically ambitious.",
                "highlights": [
                    "Master the art of maximizing without guilt",
                    "Shameless pitching and self-advocacy",
                    "Navigate office politics and combat biases",
                    "Unapologetic ambition development",
                    "Break free from 'balance' expectations"
                ],
                "target_audience": "Women professionals aspiring for growth",
                "prerequisites": "Open to ambitious women at all career levels",
                "key_outcomes": "Become unapologetically ambitious and master workplace warfare tactics"
            },
            {
                "name": "100 Board Members Program",
                "duration": "Intensive fast-track program",
                "format": "Comprehensive online + exclusive networking events",
                "price": "Premium investment - Contact for details",
                "description": "Feeling stuck at the same level in your career with no tactics working? This program teaches innovative techniques to fast-track your overdue growth and break through career plateaus.",
                "highlights": [
                    "Innovative breakthrough techniques",
                    "Fast-track career advancement strategies",
                    "Board-level positioning and visibility",
                    "Strategic networking for top positions",
                    "Break through career stagnation"
                ],
                "target_audience": "Mid to senior-level women leaders ready for breakthrough",
                "prerequisites": "Current leadership role or extensive professional experience",
                "key_outcomes": "Achieve the breakthrough and growth you deserve"
            },
            {
                "name": "Master of Business Warfare",
                "duration": "Comprehensive flagship program",
                "format": "Elite cohort with global practitioners",
                "price": "Premium - Investment for C-suite aspirants",
                "description": "Committed to reaching the C-suite but don't know how? Is 1+ Crore income your dream? This flagship program teaches cutting-edge business warfare tactics for breakthrough results in your career.",
                "highlights": [
                    "C-suite pathway strategies",
                    "Business warfare tactics from global practitioners",
                    "Achieve 1+ Crore income goals",
                    "Win without making others lose",
                    "Transformative results in minimal time",
                    "Join 78,000+ Women Leaders' Ecosystem"
                ],
                "target_audience": "Senior professionals and entrepreneurs targeting C-suite",
                "prerequisites": "Significant professional experience and serious commitment",
                "key_outcomes": "Master business warfare tactics for C-suite success and exceptional income growth"
            },
            {
                "name": "Business War Tactics Masterclass",
                "duration": "Intensive workshop series",
                "format": "Interactive sessions + practical implementation",
                "price": "Contact for latest offerings",
                "description": "Learn to implement strategies that generate transformative results in the smallest possible time. Develop an unapologetic winning mindset - stop 'just adjusting', 'suffering', or 'stop dreaming'.",
                "highlights": [
                    "Fast-track growth strategies",
                    "Winning without others losing",
                    "Combat office politics effectively",
                    "Develop unapologetic winning mindset",
                    "Learn from global practitioners' expertise"
                ],
                "target_audience": "Women professionals and business owners",
                "prerequisites": "Open to all ambitious women leaders",
                "key_outcomes": "Achieve breakthrough results fast"
            },
            {
                "name": "Winning Mindset Development",
                "duration": "Transformative coaching program",
                "format": "Group coaching + personal sessions",
                "price": "Contact for details",
                "description": "We enable women to develop mindsets towards 'Winning'. Winning doesn't mean others need to lose! Stop being told to 'suffer', 'just adjust', and 'stop dreaming'. Join our non-judgmental community that celebrates ambitions.",
                "highlights": [
                    "Develop unapologetic winning mindset",
                    "Win without fighting (even if challenged)",
                    "Personal learnings and growth experiences",
                    "Join supportive, non-judgmental community",
                    "Celebrate your ambitions and successes"
                ],
                "target_audience": "Women seeking career change/restart and entrepreneurs",
                "prerequisites": "Commitment to personal transformation",
                "key_outcomes": "Develop an unapologetic winning mindset"
            }
        ]
    
    def _load_faqs(self) -> List[Dict]:
        """Load frequently asked questions"""
        return [
            {
                "question": "Who is Iron Lady for?",
                "answer": "Iron Lady is for ambitious women who refuse to 'just adjust' or 'stop dreaming'. Our community includes: Professionals aspiring for growth, Entrepreneurs/Business Women/Self-employed, and Women seeking career change or restart. We're for women who want to WIN unapologetically!"
            },
            {
                "question": "What makes Iron Lady different?",
                "answer": "We don't teach you to 'balance' or 'suffer' - we teach you to WIN! Our approach combines 'breakthrough' and 'results-focused' thinking with Business War Tactics. We're unconventionally taking risks and judging non-judgmentally. Iron Lady communities share real ambitions, celebrate each other's successes, and practice tactics used by global practitioners, entrepreneurs, and CEOs who have become award-winners."
            },
            {
                "question": "What is Business Warfare?",
                "answer": "Business War Tactics enable women to learn to win without fighting! Our tactics implement strategies that generate transformative results in the smallest possible time. We teach winning formulas and methodologies from global practitioners' expertise, combined with personal learnings and experiences."
            },
            {
                "question": "Can I really achieve C-suite level and 1+ Crore income?",
                "answer": "Absolutely! Our Master of Business Warfare program is specifically designed for this. We teach cutting-edge business warfare tactics practiced by global practitioners. Remember: Winning doesn't mean others need to lose! Join our 78,000+ Women Leaders' Ecosystem."
            },
            {
                "question": "How do I join the Iron Lady community?",
                "answer": "Contact us at +91-6360823123 or explore our programs. We have programs for different career stages and goals. Whether you're stuck at the same level, feel guilty about ambition, or ready for the C-suite, we have a path for you."
            },
            {
                "question": "Are the programs available internationally?",
                "answer": "Yes! Our content is created, used, and practiced by global practitioners, entrepreneurs, and CEOs. We offer online and hybrid formats accessible worldwide, with our community spanning across the globe."
            },
            {
                "question": "What is the Iron Lady mission?",
                "answer": "ELEVATING A MILLION WOMEN TO THE TOP. We enable women to develop mindsets towards 'Winning' through our non-judgmental, celebration-focused learning sessions. Every woman is common in being uncommon in the business world - we celebrate that!"
            }
        ]
    
    def _load_enrollment_info(self) -> Dict:
        """Load enrollment process information"""
        return {
            "steps": [
                "Explore our programs and choose the one aligned with your breakthrough goals",
                "Contact us at +91-6360823123 or through our website",
                "Schedule a consultation to discuss your ambitions and goals",
                "Receive program details, investment information, and next cohort dates",
                "Join the Iron Lady community and start your transformation",
                "Become part of our 78,000+ Women Leaders' Ecosystem"
            ],
            "requirements": [
                "Commitment to your own growth and success",
                "Willingness to embrace an unapologetic winning mindset",
                "Readiness to challenge 'balance' and 'adjust' mentality",
                "Ambition to achieve breakthrough results"
            ],
            "payment_options": [
                "Contact our team for program investment details",
                "Flexible payment options available",
                "Corporate sponsorship programs",
                "Special offers for group enrollments"
            ],
            "start_dates": "Multiple cohorts throughout the year - Contact for latest schedule",
            "contact": {
                "phone": "+91-6360823123",
                "website": "www.ironlady.com",
                "mission": "ELEVATING A MILLION WOMEN TO THE TOP",
                "community_size": "78,000+ Women Leaders' Ecosystem"
            },
            "who_should_join": [
                "Professionals aspiring for growth",
                "Entrepreneurs/Business Women/Self-employed",
                "Women seeking career change/restart"
            ]
        }
    
    def get_context(self) -> str:
        """Get formatted context for the AI prompt"""
        context = "PROGRAMS:\n\n"
        
        for program in self.programs:
            context += f"• {program['name']}\n"
            context += f"  Duration: {program['duration']}\n"
            context += f"  Price: {program['price']}\n"
            context += f"  Format: {program['format']}\n"
            context += f"  Description: {program['description']}\n\n"
        
        context += "\nENROLLMENT PROCESS:\n"
        for i, step in enumerate(self.enrollment_info['steps'], 1):
            context += f"{i}. {step}\n"
        
        context += f"\nCONTACT & COMMUNITY:\n"
        context += f"Phone: {self.enrollment_info['contact']['phone']}\n"
        context += f"Website: {self.enrollment_info['contact']['website']}\n"
        context += f"Mission: {self.enrollment_info['contact']['mission']}\n"
        context += f"Community: {self.enrollment_info['contact']['community_size']}\n"
        
        return context
    
    def get_programs_info(self) -> List[Dict]:
        """Get all programs information"""
        return self.programs
    
    def search_programs(self, query: str) -> List[Dict]:
        """Search programs based on query"""
        query_lower = query.lower()
        results = []
        
        for program in self.programs:
            if (query_lower in program['name'].lower() or 
                query_lower in program['description'].lower() or
                any(query_lower in highlight.lower() for highlight in program['highlights'])):
                results.append(program)
        
        return results
