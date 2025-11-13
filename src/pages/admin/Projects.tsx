import { useState, useEffect } from 'react';
import { projectsAPI, statusAPI, type Project } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, FolderKanban } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    projectName: string;
    projectDescription: string;
    clientName: string;
    projectType: string;
    projectAddress: string;
    startDate: string;
    completionDate: string;
    statusId: string;
    file: File | null;
  }>({
    projectName: '',
    projectDescription: '',
    clientName: '',
    projectType: '',
    projectAddress: '',
    startDate: '',
    completionDate: '',
    statusId: '',
    file: null,
  });
  const [statuses, setStatuses] = useState<{ id: number; statusname: string }[]>([]);

  useEffect(() => {
    statusAPI.getAll().then(r => setStatuses(r.data));
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.projectDescription || !formData.clientName || !formData.projectType || !formData.projectAddress || !formData.startDate || !formData.completionDate || !formData.statusId || (!formData.file && !editingProject)) {
      toast({ title: 'Error', description: 'Please fill all required fields (file is required for create)', variant: 'destructive' });
      return;
    }
    const fd = new FormData();
    if (formData.file) fd.append('file', formData.file as Blob);
    fd.append('projectName', formData.projectName);
    fd.append('projectDescription', formData.projectDescription);
    fd.append('clientName', formData.clientName);
    fd.append('projectType', formData.projectType);
    fd.append('projectAddress', formData.projectAddress);
    fd.append('startDate', formData.startDate);
    fd.append('completionDate', formData.completionDate);
    fd.append('statusId', formData.statusId);
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject.id!, fd);
        toast({ title: 'Success', description: 'Project updated successfully' });
      } else {
        await projectsAPI.create(fd);
        toast({ title: 'Success', description: 'Project created successfully' });
      }
      setDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save project', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectsAPI.delete(id);
      toast({ title: 'Success', description: 'Project deleted successfully' });
      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      clientName: project.clientName,
      projectType: project.projectType,
      projectAddress: project.projectAddress,
      startDate: project.startDate,
      completionDate: project.completionDate,
      statusId: project.statusId.toString(),
      file: null, // No file editing in this form, only new file upload
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      projectName: '',
      projectDescription: '',
      clientName: '',
      projectType: '',
      projectAddress: '',
      startDate: '',
      completionDate: '',
      statusId: '',
      file: null,
    });
    setEditingProject(null);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage real estate projects
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Add Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Project name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Description *</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Project description"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Type *</Label>
                <Input
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  placeholder="Residential, Commercial, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectAddress">Address *</Label>
                <Input
                  id="projectAddress"
                  value={formData.projectAddress}
                  onChange={(e) => setFormData({ ...formData, projectAddress: e.target.value })}
                  placeholder="Project address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completionDate">Completion Date</Label>
                <Input
                  id="completionDate"
                  type="datetime-local"
                  value={formData.completionDate}
                  onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={formData.statusId}
                  onChange={(e) => setFormData({ ...formData, statusId: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a status</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.statusname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Project File (Image or PDF) *</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  required
                />
                {formData.file && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected file: {formData.file.name}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingProject ? 'Update' : 'Create'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No projects</h3>
              <p className="text-muted-foreground">Get started by adding your first project.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image/File</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      {project.fileUrl && project.fileType && (
                        project.fileType.includes('image') ? (
                          <img
                            src={project.fileUrl}
                            alt={project.projectName}
                            className="w-20 h-12 object-cover rounded"
                          />
                        ) : (
                          <video
                            src={project.fileUrl}
                            controls
                            className="w-20 h-12 object-cover rounded"
                          >
                            Your browser does not support the video tag.
                          </video>
                        )
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                    <TableCell>{project.clientName}</TableCell>
                    <TableCell>{project.projectType}</TableCell>
                    <TableCell>{project.projectAddress}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>{project.completionDate || 'N/A'}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                        {project.status?.statusname || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(project.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
