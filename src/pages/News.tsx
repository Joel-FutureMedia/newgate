import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { newsAPI, type NewsItem } from "@/lib/api";

const News = () => {
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsAPI.getAll();
        setNewsArticles(
          (response.data || []).sort((a, b) =>
            new Date(b.createdDate || 0).getTime() - new Date(a.createdDate || 0).getTime()
          )
        );
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">News & Updates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed about our latest projects, market insights, and company news
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : newsArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No news articles available at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <Card
                  key={article.id || index}
                  className="overflow-hidden border-none shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {article.fileType.startsWith('image') ? (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={article.fileUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : article.fileType.startsWith('video') ? (
                    <div className="relative h-56 overflow-hidden">
                      <video
                        src={article.fileUrl}
                        className="w-full h-full object-cover transition-transform duration-500"
                        controls
                        preload="metadata"
                        playsInline
                        onLoadedMetadata={(e) => {
                          // Video metadata loaded, ready to play
                          console.log('Video metadata loaded for:', article.title);
                        }}
                        onCanPlay={(e) => {
                          // Video can start playing
                          console.log('Video can play for:', article.title);
                        }}
                        onError={(e) => {
                          console.error('Video loading error for article:', article.title, e);
                        }}
                        onPlay={() => {
                          console.log('Video started playing:', article.title);
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : null}
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      {article.createdDate && (
                        <span>{new Date(article.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
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

export default News;
