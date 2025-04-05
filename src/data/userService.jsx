// Mocked data store (you can replace this with real API later)
const mockLogs = [
    {
      id: 1,
      userId: 101,
      action: 'User Logged In',
      type: 'LOGIN',
      timestamp: '2025-04-01 10:45:00',
      ipAddress: '192.168.1.10',
      details: 'Login from dashboard web app',
    },
    {
      id: 2,
      userId: 101,
      action: 'Changed Password',
      type: 'CHANGE',
      timestamp: '2025-04-01 11:05:00',
      ipAddress: '192.168.1.10',
      details: 'User updated their password',
    },
    {
      id: 3,
      userId: 101,
      action: 'Failed Login Attempt',
      type: 'ERROR',
      timestamp: '2025-04-02 08:00:00',
      ipAddress: '192.168.1.50',
      details: 'Wrong password entered 3 times',
    }
  ];
  
  // 🚀 Mock implementation of the activity log fetch
  const getUserActivityLog = async (userId, { search = '', type = '' } = {}) => {
    return mockLogs
      .filter(log => log.userId === userId)
      .filter(log => (type ? log.type === type : true))
      .filter(log =>
        search
          ? log.action.toLowerCase().includes(search.toLowerCase()) ||
            log.details.toLowerCase().includes(search.toLowerCase())
          : true
      );
  };
  
  export default {
    // ... other userService methods
    getUserActivityLog,
  };
  