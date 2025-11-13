import { useState, useEffect } from 'react';
import { heroAPI, type HeroSection } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const HeroImages = () => {
  const [images, setImages] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroSection | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<{ file: File | null; title: string; description: string; }>({ file: null, title: '', description: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await heroAPI.getAll();
      // Normalize title vs tittle from backend
      const normalized = (response.data || []).map((item) => ({
        ...item,
        title: (item as any).title ?? (item as any).tittle ?? '',
      }));
      setImages(normalized);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch hero sections', variant: 'destructive', });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!formData.file && !editingImage) || !formData.title || !formData.description) {
      toast({ title: 'Error', description: 'All fields are required (file required for new item)', variant: 'destructive' });
      return;
    }
    const fd = new FormData();
    if (formData.file) fd.append('file', formData.file as Blob);
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    try {
      if (editingImage) {
        await heroAPI.update(editingImage.id!, fd);
        toast({ title: 'Success', description: 'Hero section updated successfully' });
      } else {
        await heroAPI.create(fd);
        toast({ title: 'Success', description: 'Hero section created successfully' });
      }
      setDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save hero section', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await heroAPI.delete(id);
      toast({ title: 'Success', description: 'Hero image deleted successfully' });
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete hero image',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (image: HeroSection) => {
    setEditingImage(image);
    setFormData({
      file: null, // Reset file for editing
      title: (image as any).title || (image as any).tittle || '',
      description: image.description || '',
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ file: null, title: '', description: '' });
    setEditingImage(null);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hero Images</h1>
          <p className="text-muted-foreground mt-2">
            Manage homepage carousel images
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Hero Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Hero Image' : 'Add Hero Image'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tittle overlay"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File *</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  required={!editingImage}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingImage ? 'Update' : 'Create'}
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
          <CardTitle>Hero Images List</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No hero images</h3>
              <p className="text-muted-foreground">Get started by adding your first hero image.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images.map((img) => (
                  <TableRow key={img.id}>
                    <TableCell>
                      <img
                        src={img.fileUrl}
                        alt={(img as any).title || (img as any).tittle || ''}
                        className="w-20 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{(img as any).title || (img as any).tittle}</TableCell>
                    <TableCell>{img.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(img)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(img.id!)}
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

export default HeroImages;
