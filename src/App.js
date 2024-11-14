import React, { useState } from 'react';
import TaskManager from './TaskManager';
import Background3D from './Background3D';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { UserCircle } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Background3D />
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">3D Task Master</h1>
          <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
            <UserCircle className="mr-2 h-5 w-5" />
            Login
          </Button>
        </div>
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
          />
        </div>
        <TaskManager searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;