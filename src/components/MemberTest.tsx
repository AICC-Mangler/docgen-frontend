import React, { useState, useEffect } from 'react';
import { 
  MemberService, 
  Member, 
  CreateMemberDto, 
  UpdateMemberDto, 
  MemberRole 
} from '../api';

const MemberTest: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // 새 멤버 생성 폼 상태
  const [newMember, setNewMember] = useState<CreateMemberDto>({
    name: '',
    email: '',
    role: 'USER',
    password: '',
  });

  // 멤버 수정 폼 상태
  const [updateMember, setUpdateMember] = useState<UpdateMemberDto>({
    name: '',
    email: '',
    role: 'USER',
  });

  // 컴포넌트 마운트 시 멤버 목록 로드
  useEffect(() => {
    loadMembers();
  }, []);

  // 에러 및 성공 메시지 자동 삭제
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError('');
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  // 멤버 목록 로드
  const loadMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const memberList = await MemberService.getAllMembers();
      setMembers(memberList);
      setSuccessMessage('멤버 목록을 성공적으로 로드했습니다.');
    } catch (err: any) {
      setError(err.message || '멤버 목록 로드에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 특정 멤버 조회
  const handleGetMember = async (id: number) => {
    try {
      setLoading(true);
      setError('');
      const member = await MemberService.getMemberById(id);
      setSelectedMember(member);
      setUpdateMember({
        name: member.name,
        email: member.email,
        role: member.role,
      });
      setSuccessMessage(`멤버 ${member.name}을 조회했습니다.`);
    } catch (err: any) {
      setError(err.message || '멤버 조회에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 새 멤버 생성
  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const createdMember = await MemberService.createMember(newMember);
      setMembers([...members, createdMember]);
      setNewMember({
        name: '',
        email: '',
        role: 'USER',
        password: '',
      });
      setSuccessMessage(`멤버 ${createdMember.name}이 생성되었습니다.`);
    } catch (err: any) {
      setError(err.message || '멤버 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 멤버 수정
  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      setLoading(true);
      setError('');
      const updatedMember = await MemberService.updateMember(selectedMember.id, updateMember);
      setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
      setSelectedMember(updatedMember);
      setSuccessMessage(`멤버 ${updatedMember.name}이 수정되었습니다.`);
    } catch (err: any) {
      setError(err.message || '멤버 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 멤버 삭제
  const handleDeleteMember = async (id: number) => {
    if (!window.confirm('정말로 이 멤버를 삭제하시겠습니까?')) return;

    try {
      setLoading(true);
      setError('');
      await MemberService.deleteMember(id);
      setMembers(members.filter(m => m.id !== id));
      if (selectedMember?.id === id) {
        setSelectedMember(null);
      }
      setSuccessMessage('멤버가 삭제되었습니다.');
    } catch (err: any) {
      setError(err.message || '멤버 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>독젠 백엔드 API 테스트</h1>
      
      {/* 상태 메시지 */}
      {loading && <div style={{ color: 'blue', marginBottom: '10px' }}>로딩 중...</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>❌ {error}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>✅ {successMessage}</div>}

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 왼쪽: 멤버 목록 */}
        <div style={{ flex: 1 }}>
          <h2>멤버 목록</h2>
          <button onClick={loadMembers} disabled={loading} style={{ marginBottom: '10px' }}>
            목록 새로고침
          </button>
          
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', maxHeight: '400px', overflowY: 'auto' }}>
            {members.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>멤버가 없습니다.</div>
            ) : (
              members.map(member => (
                <div
                  key={member.id}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: selectedMember?.id === member.id ? '#f0f8ff' : 'white'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{member.name} ({member.role})</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{member.email}</div>
                  <div style={{ marginTop: '5px' }}>
                    <button onClick={() => handleGetMember(member.id)} disabled={loading}>
                      상세 조회
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member.id)} 
                      disabled={loading}
                      style={{ marginLeft: '5px', backgroundColor: '#ff4444', color: 'white' }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 오른쪽 상단: 새 멤버 생성 */}
        <div style={{ flex: 1 }}>
          <h2>새 멤버 생성</h2>
          <form onSubmit={handleCreateMember} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>이름:</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                required
                maxLength={10}
                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>이메일:</label>
              <input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                required
                maxLength={50}
                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>역할:</label>
              <select
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value as MemberRole })}
                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MODERATOR">MODERATOR</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>비밀번호:</label>
              <input
                type="password"
                value={newMember.password}
                onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                required
                minLength={6}
                maxLength={255}
                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
              />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
              멤버 생성
            </button>
          </form>

          {/* 오른쪽 하단: 멤버 수정 */}
          {selectedMember && (
            <>
              <h2 style={{ marginTop: '20px' }}>멤버 수정</h2>
              <form onSubmit={handleUpdateMember} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px' }}>
                <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                  선택된 멤버: {selectedMember.name} (ID: {selectedMember.id})
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>이름:</label>
                  <input
                    type="text"
                    value={updateMember.name || ''}
                    onChange={(e) => setUpdateMember({ ...updateMember, name: e.target.value })}
                    maxLength={10}
                    style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>이메일:</label>
                  <input
                    type="email"
                    value={updateMember.email || ''}
                    onChange={(e) => setUpdateMember({ ...updateMember, email: e.target.value })}
                    maxLength={50}
                    style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>역할:</label>
                  <select
                    value={updateMember.role || 'USER'}
                    onChange={(e) => setUpdateMember({ ...updateMember, role: e.target.value as MemberRole })}
                    style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MODERATOR">MODERATOR</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white' }}>
                  멤버 수정
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberTest;
