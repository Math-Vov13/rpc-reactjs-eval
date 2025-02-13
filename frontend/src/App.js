// Libraries
import React, { useState, useContext, createContext } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { 
  Plus, 
  LogOut,
  CheckCircle2,
  Clock,
  Loader2,
  Search,
  Calendar,
  User
} from "lucide-react";

const AuthContext = createContext(null);


// App
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email) => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {!isAuthenticated ? <LoginPage /> : <Dashboard />}
      </div>
    </AuthContext.Provider>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md px-6">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Tableau de Bord</CardTitle>
            <p className="text-gray-500">Connectez-vous pour accéder à vos tâches</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="vous@exemple.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([ // All taks - for examples.
    { id: '1', title: 'Développer la page d\'accueil', description: 'Créer une interface moderne', status: 'IN_PROGRESS', userId: '1', date: '2024-02-13' },
    { id: '2', title: 'Optimiser les performances', description: 'Améliorer le temps de chargement', status: 'TODO', userId: '1', date: '2024-02-14' },
    { id: '3', title: 'Tests unitaires', description: 'Écrire les tests pour les composants', status: 'DONE', userId: '1', date: '2024-02-12' },
  ]);
  const [searchTerm, setSearchTerm] = useState(''); // Search request

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Dashboard des Tâches</h1>
            <Button variant="ghost" onClick={logout} className="text-gray-600 hover:text-gray-900">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <CreateTaskForm onCreateTask={addTask} />
          </div>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="all" className="rounded px-4 py-2 text-sm font-medium">
                    Toutes
                  </TabsTrigger>
                  <TabsTrigger value="todo" className="rounded px-4 py-2 text-sm font-medium">
                    À faire
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="rounded px-4 py-2 text-sm font-medium">
                    En cours
                  </TabsTrigger>
                  <TabsTrigger value="done" className="rounded px-4 py-2 text-sm font-medium">
                    Terminées
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <TaskList tasks={filteredTasks} onUpdateStatus={updateTaskStatus} />
                </TabsContent>
                <TabsContent value="todo">
                  <TaskList 
                    tasks={filteredTasks.filter(task => task.status === 'TODO')} 
                    onUpdateStatus={updateTaskStatus}
                  />
                </TabsContent>
                <TabsContent value="in-progress">
                  <TaskList 
                    tasks={filteredTasks.filter(task => task.status === 'IN_PROGRESS')} 
                    onUpdateStatus={updateTaskStatus}
                  />
                </TabsContent>
                <TabsContent value="done">
                  <TaskList 
                    tasks={filteredTasks.filter(task => task.status === 'DONE')} 
                    onUpdateStatus={updateTaskStatus}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

const CreateTaskForm = ({ onCreateTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask({
      title,
      description,
      status: 'TODO',
      userId: '1',
    });
    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <div>
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Tâche
        </Button>
      ) : (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Créer une nouvelle tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <Input
                  placeholder="Titre de la tâche"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Input
                  placeholder="Description détaillée"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Créer
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onUpdateStatus }) => {
  const getStatusBadge = (status) => {
    const styles = {
      'DONE': 'bg-green-100 text-green-800',
      'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
      'TODO': 'bg-gray-100 text-gray-800'
    };

    const labels = {
      'DONE': 'Terminée',
      'IN_PROGRESS': 'En cours',
      'TODO': 'À faire'
    };

    return (
      <Badge className={`${styles[status]} px-2 py-1 text-xs font-medium rounded-full`}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{task.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusBadge(task.status)}
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onUpdateStatus(task.id, 'TODO')}
                    disabled={task.status === 'TODO'}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Loader2 className="h-4 w-4" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onUpdateStatus(task.id, 'IN_PROGRESS')}
                    disabled={task.status === 'IN_PROGRESS'}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onUpdateStatus(task.id, 'DONE')}
                    disabled={task.status === 'DONE'}
                    className="text-green-500 hover:text-green-700"
                  >


                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default App;