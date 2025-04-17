import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
}

interface Props {
  todos: {
    data: Todo[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  filters: {
    search: string;
    status: string;
    priority: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Todos',
    href: '/todos',
  },
];

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function Index({ todos, filters }: Props) {
  const [search, setSearch] = useState(filters.search);
  const [status, setStatus] = useState(filters.status);
  const [priority, setPriority] = useState(filters.priority);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.get('/todos', { search, status, priority }, { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Todos" />
      <div className="flex flex-col space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
          <Link href="/todos/create">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Todo
            </Button>
          </Link>
        </div>

        <div className="rounded-md border">
          <form onSubmit={handleSearch} className="border-b p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 items-center space-x-2">
                <Input
                  placeholder="Search todos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>

                <Button type="submit">Filter</Button>
              </div>
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No todos found
                  </TableCell>
                </TableRow>
              ) : (
                todos.data.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <div className="font-medium">{todo.title}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {todo.description?.substring(0, 50) || 'No description'}
                        {todo.description && todo.description.length > 50 ? '...' : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(todo.status)}`}>
                        {todo.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(todo.priority)}`}>
                        {todo.priority}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(todo.due_date)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/todos/${todo.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                      <Link href={`/todos/${todo.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this todo?')) {
                            router.delete(`/todos/${todo.id}`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {todos.meta.last_page > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {todos.meta.from} to {todos.meta.to} of {todos.meta.total} todos
              </div>
              <div className="flex items-center space-x-2">
                {todos.meta.links.map((link, i) => {
                  if (link.url === null) {
                    return (
                      <div 
                        key={i} 
                        className="h-9 w-9 flex items-center justify-center rounded-md text-sm opacity-50"
                      >
                        {link.label === "&laquo; Previous" ? "←" : "→"}
                      </div>
                    );
                  }

                  return (
                    <Button
                      key={i}
                      variant={link.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => router.get(link.url)}
                      className="h-9 w-9"
                    >
                      {link.label === "&laquo; Previous" 
                        ? "←" 
                        : link.label === "Next &raquo;" 
                        ? "→" 
                        : link.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
