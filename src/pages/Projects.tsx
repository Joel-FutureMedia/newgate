import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsAPI, type Project } from "@/lib/api";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">Our Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our portfolio of exceptional developments across Namibia, 
              from commercial landmarks to residential masterpieces.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects available at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id || index}
                  className="overflow-hidden border-none shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    {project.fileType.startsWith('image') ? (
                      <img
                        src={project.fileUrl}
                        alt={project.projectName}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : project.fileType.startsWith('video') ? (
                      <video
                        src={project.fileUrl}
                        className="w-full h-full object-cover transition-transform duration-500"
                        controls
                        preload="metadata"
                        playsInline
                        onLoadedMetadata={(e) => {
                          // Video metadata loaded, ready to play
                          console.log('Video metadata loaded for:', project.projectName);
                        }}
                        onCanPlay={(e) => {
                          // Video can start playing
                          console.log('Video can play for:', project.projectName);
                        }}
                        onError={(e) => {
                          console.error('Video loading error for project:', project.projectName, e);
                        }}
                        onPlay={() => {
                          console.log('Video started playing:', project.projectName);
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    <div className="absolute top-4 right-4">
                      <Badge variant="default">{project.status?.statusname}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-2xl">{project.projectName}</CardTitle>
                      <Badge variant="outline" className="text-xs">{project.projectType}</Badge>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {project.clientName && (
                        <div className="mb-1"><span className="font-medium">Client:</span> {project.clientName}</div>
                      )}
                      {project.projectAddress && (
                        <div className="mb-1"><span className="font-medium">Address:</span> {project.projectAddress}</div>
                      )}
                      {project.startDate && project.completionDate && (
                        <div className="mb-1">
                          <span className="font-medium">Duration:</span> {new Date(project.startDate).toLocaleDateString()} to {new Date(project.completionDate).toLocaleDateString()}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed mb-2">{project.projectDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
