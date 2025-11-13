import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Newspaper, FolderKanban } from 'lucide-react';

const Dashboard = () => {
  const sections = [
    {
      title: 'Hero Images',
      description: 'Manage carousel images on the homepage',
      icon: Image,
      href: '/admin/hero-images',
      color: 'from-primary/10 to-primary/5',
    },
    {
      title: 'Projects',
      description: 'Manage real estate projects',
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'from-secondary/10 to-secondary/5',
    },
    {
      title: 'News',
      description: 'Manage news articles and updates',
      icon: Newspaper,
      href: '/admin/news',
      color: 'from-accent/10 to-accent/5',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content from here
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} to={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-2`}>
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
