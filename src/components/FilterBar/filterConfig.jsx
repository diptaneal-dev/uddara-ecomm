export const filterConfig = {
    User: [
      {
        key: 'status',
        label: 'Status',
        options: [
          { label: 'All', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Recently Deactivated', value: 'recent' },
        ],
        multi: false,
      },
      {
        key: 'store',
        label: 'Store',
        options: [
          { label: 'All Stores', value: '' },
          { label: 'Store A', value: 'storeA' },
          { label: 'Store B', value: 'storeB' },
        ],
        multi: false,
      },
      {
        key: 'role',
        label: 'Role',
        options: [
          { label: 'Guest', value: 'GUEST' },
          { label: 'Customer', value: 'CUSTOMER' },
          { label: 'Staff', value: 'STAFF' },
          { label: 'Store Admin', value: 'STOREADMIN' },
          { label: 'Group Admin', value: 'GROUPADMIN' },
          { label: 'Support', value: 'SUPPORT' },
          { label: 'Super Admin', value: 'SUPERADMIN' },
        ],
        multi: true,
      }  
    ],
    Client: [
      {
        key: 'tier',
        label: 'Tier',
        options: [
          { label: 'All', value: '' },
          { label: 'Gold', value: 'gold' },
          { label: 'Silver', value: 'silver' },
        ],
        multi: false,
        checkboxes: true,
      }
    ],
    Inventory: [
      {
        key: 'category',
        label: 'Category',
        options: [
          { label: 'All', value: '' },
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
        ],
        multi: true,
        checkboxes: true,
      }
    ]
  };
  