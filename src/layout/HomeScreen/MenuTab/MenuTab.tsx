import React, { useState } from 'react';

const MenuTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Following');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handleTabClick('Following')}
          className={activeTab === 'Following' ? 'active' : ''}
        >
          Following
        </button>
        <button
          onClick={() => handleTabClick('News')}
          className={activeTab === 'News' ? 'active' : ''}
        >
          News
        </button>
      </div>
      {activeTab === 'Following' && <div>Following Tab Content</div>}
      {activeTab === 'News' && <div>News Tab Content</div>}
    </div>
  );
};

export default MenuTab;