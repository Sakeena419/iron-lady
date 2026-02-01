// This file contains all remaining components for the Iron Lady application
// You can split these into separate files if preferred

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X, Search } from 'lucide-react';
import { participantAPI, programAPI, enrollmentAPI, milestoneAPI, transformationStoryAPI } from '../services/api';

// ==================== PARTICIPANTS COMPONENT ====================
export function Participants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await participantAPI.getAll();
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this participant?')) return;
    try {
      await participantAPI.delete(id);
      fetchParticipants();
    } catch (error) {
      console.error('Error deleting participant:', error);
      alert('Failed to delete participant');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      if (editingParticipant) {
        await participantAPI.update(editingParticipant.id, data);
      } else {
        await participantAPI.create(data);
      }
      setShowForm(false);
      setEditingParticipant(null);
      fetchParticipants();
    } catch (error) {
      console.error('Error saving participant:', error);
      alert('Failed to save participant');
    }
  };

  if (loading) return <div className="loading">Loading participants...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Participants</h2>
        <p>Manage all program participants</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 className="card-title">All Participants ({participants.length})</h3>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Add Participant
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>Industry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.participant_id}</strong></td>
                  <td>{p.full_name}</td>
                  <td>{p.email}</td>
                  <td>{p.current_role}</td>
                  <td>{p.current_company}</td>
                  <td>{p.industry}</td>
                  <td>
                    <span className={`status-badge status-${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm btn-primary" onClick={() => { setEditingParticipant(p); setShowForm(true); }}>
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Participant Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingParticipant ? 'Edit Participant' : 'Add New Participant'}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => { setShowForm(false); setEditingParticipant(null); }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Participant ID *</label>
                  <input name="participant_id" className="form-control" required defaultValue={editingParticipant?.participant_id} disabled={!!editingParticipant} />
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="full_name" className="form-control" required defaultValue={editingParticipant?.full_name} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" className="form-control" required defaultValue={editingParticipant?.email} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input name="phone" className="form-control" defaultValue={editingParticipant?.phone} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Current Role</label>
                  <input name="current_role" className="form-control" defaultValue={editingParticipant?.current_role} />
                </div>
                <div className="form-group">
                  <label>Current Company</label>
                  <input name="current_company" className="form-control" defaultValue={editingParticipant?.current_company} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="number" name="years_of_experience" className="form-control" defaultValue={editingParticipant?.years_of_experience} />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input name="industry" className="form-control" defaultValue={editingParticipant?.industry} />
                </div>
              </div>
              <div className="form-group">
                <label>Career Goal</label>
                <textarea name="career_goal" className="form-control" rows="3" defaultValue={editingParticipant?.career_goal} />
              </div>
              {!editingParticipant && (
                <div className="form-group">
                  <label>Enrollment Date *</label>
                  <input type="date" name="enrollment_date" className="form-control" required defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingParticipant(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingParticipant ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== PROGRAMS COMPONENT ====================
export function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await programAPI.getAll();
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This will delete all enrollments!')) return;
    try {
      await programAPI.delete(id);
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      if (editingProgram) {
        await programAPI.update(editingProgram.id, data);
      } else {
        await programAPI.create(data);
      }
      setShowForm(false);
      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program');
    }
  };

  if (loading) return <div className="loading">Loading programs...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Programs</h2>
        <p>Manage leadership development programs</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 className="card-title">All Programs ({programs.length})</h3>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Create Program
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Modules</th>
                <th>Price</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.program_name}</strong></td>
                  <td>{p.program_type}</td>
                  <td>{p.duration_weeks} weeks</td>
                  <td>{p.total_modules}</td>
                  <td>₹{p.price?.toLocaleString()}</td>
                  <td>{new Date(p.start_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm btn-primary" onClick={() => { setEditingProgram(p); setShowForm(true); }}>
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProgram ? 'Edit Program' : 'Create New Program'}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => { setShowForm(false); setEditingProgram(null); }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Program Name *</label>
                <input name="program_name" className="form-control" required defaultValue={editingProgram?.program_name} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Program Type *</label>
                  <select name="program_type" className="form-control" required defaultValue={editingProgram?.program_type}>
                    <option value="">Select Type</option>
                    <option value="Leadership Essentials">Leadership Essentials</option>
                    <option value="100 Board Members">100 Board Members</option>
                    <option value="Master of Business Warfare">Master of Business Warfare</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select name="status" className="form-control" required defaultValue={editingProgram?.status || 'Upcoming'}>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration (weeks) *</label>
                  <input type="number" name="duration_weeks" className="form-control" required defaultValue={editingProgram?.duration_weeks} />
                </div>
                <div className="form-group">
                  <label>Total Modules *</label>
                  <input type="number" name="total_modules" className="form-control" required defaultValue={editingProgram?.total_modules} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" step="0.01" name="price" className="form-control" defaultValue={editingProgram?.price} />
                </div>
                <div className="form-group">
                  <label>Max Participants</label>
                  <input type="number" name="max_participants" className="form-control" defaultValue={editingProgram?.max_participants} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input type="date" name="start_date" className="form-control" required defaultValue={editingProgram?.start_date} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" name="end_date" className="form-control" defaultValue={editingProgram?.end_date} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="3" defaultValue={editingProgram?.description} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingProgram(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingProgram ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ENROLLMENTS COMPONENT ====================
export function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentAPI.getAll();
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading enrollments...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Enrollments</h2>
        <p>Track participant progress through programs</p>
      </div>

      <div className="card">
        <h3 className="card-title">All Enrollments ({enrollments.length})</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Program</th>
                <th>Enrolled</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Attendance</th>
                <th>Modules</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td><strong>{e.full_name}</strong></td>
                  <td>{e.program_name}</td>
                  <td>{new Date(e.enrollment_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${e.status.toLowerCase().replace(' ', '-')}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, background: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${e.overall_progress_percentage}%`, 
                          height: '100%', 
                          background: e.overall_progress_percentage >= 75 ? '#27ae60' : e.overall_progress_percentage >= 50 ? '#f39c12' : '#e74c3c',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <span style={{ fontWeight: '600', minWidth: '45px' }}>{e.overall_progress_percentage}%</span>
                    </div>
                  </td>
                  <td>{e.attendance_percentage}%</td>
                  <td>{e.modules_completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== MILESTONES COMPONENT ====================
export function Milestones() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const response = await milestoneAPI.getAll();
      setMilestones(response.data);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading milestones...</div>;

  const getMilestoneIcon = (type) => {
    const icons = {
      'Promotion': '🚀',
      'Salary Increase': '💰',
      'Job Change': '🔄',
      'Leadership Role': '👑',
      'Board Position': '🏆',
      'Business Growth': '📈',
      'Award': '🏅',
      'Other': '⭐'
    };
    return icons[type] || '⭐';
  };

  return (
    <div>
      <div className="page-header">
        <h2>Milestones & Achievements</h2>
        <p>Celebrate participant success stories</p>
      </div>

      <div className="card">
        <h3 className="card-title">Recent Milestones ({milestones.length})</h3>
        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          {milestones.map((m) => (
            <div key={m.id} style={{ 
              padding: '20px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '15px' }}>
                <div style={{ fontSize: '32px' }}>{getMilestoneIcon(m.milestone_type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>
                    {m.milestone_title}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                    {m.full_name} - {m.milestone_type}
                  </div>
                  {m.description && (
                    <div style={{ fontSize: '14px', opacity: 0.85, marginBottom: '8px' }}>
                      {m.description}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', opacity: 0.9 }}>
                    {m.previous_value && m.new_value && (
                      <span>{m.previous_value} → {m.new_value}</span>
                    )}
                    {m.percentage_increase && (
                      <span style={{ fontWeight: '600' }}>+{m.percentage_increase}%</span>
                    )}
                    <span>{new Date(m.achievement_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== TRANSFORMATION STORIES COMPONENT ====================
export function TransformationStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await transformationStoryAPI.getAll();
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading transformation stories...</div>;

  return (
    <div>
      <div className="page-header">
        <h2>Transformation Stories</h2>
        <p>Inspiring journeys from our participants</p>
      </div>

      <div style={{ display: 'grid', gap: '25px' }}>
        {stories.map((story) => (
          <div key={story.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              {story.featured && (
                <span style={{ 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  ⭐ FEATURED
                </span>
              )}
              <h3 style={{ flex: 1, margin: 0 }}>{story.story_title}</h3>
            </div>
            
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '15px' }}>
              <strong>{story.full_name}</strong> • {story.program_name} • Published {new Date(story.published_date).toLocaleDateString()}
            </div>

            <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
              {story.story_content}
            </div>

            {story.before_snapshot && story.after_snapshot && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '2px dashed #f39c12' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#856404' }}>📉 Before</div>
                  <div style={{ fontSize: '14px', color: '#856404' }}>{story.before_snapshot}</div>
                </div>
                <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', border: '2px dashed #27ae60' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#155724' }}>📈 After</div>
                  <div style={{ fontSize: '14px', color: '#155724' }}>{story.after_snapshot}</div>
                </div>
              </div>
            )}

            {story.key_learnings && (
              <div style={{ padding: '15px', background: '#e7f3ff', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#2980b9' }}>💡 Key Learnings</div>
                <div style={{ fontSize: '14px', color: '#2c3e50' }}>{story.key_learnings}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
