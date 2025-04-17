import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarIcon, CheckIcon, ClockIcon, EditIcon, TrashIcon } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  todo: Todo;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
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

const getPriorityColor = (priority: string) => {
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

export default function Show({ todo }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Todos',
      href: '/todos',
    },
    {
      title: todo.title,
      href: `/todos/${todo.id}`,
    },
  ];

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      router.delete(`/todos/${todo.id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Todo: ${todo.title}`} />
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">View Todo</h1>
          <div className="flex space-x-2">
            <Link href={`/todos/${todo.id}/edit`}>
              <Button variant="outline">
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{todo.title}</CardTitle>
                <CardDescription className="mt-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-2 ${getStatusColor(todo.status)}`}>
                    <CheckIcon className="mr-1 h-3 w-3" />
                    {todo.status.replace('_', ' ')}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                    Priority: {todo.priority}
                  </span>
                </CardDescription>
              </div>
              {todo.due_date && (
                <Badge variant="outline" className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  Due: {formatDate(todo.due_date)}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                <div className="mt-2 whitespace-pre-wrap">
                  {todo.description || <span className="text-gray-400 italic">No description provided</span>}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-gray-500 border-t pt-4">
            <div className="flex items-center">
              <ClockIcon className="mr-1 h-3 w-3" />
              Created: {formatDateTime(todo.created_at)}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-1 h-3 w-3" />
              Last Updated: {formatDateTime(todo.updated_at)}
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 flex justify-end">
          <Link href="/todos">
            <Button variant="outline">Back to Todo List</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
