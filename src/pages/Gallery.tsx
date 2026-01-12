import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

type GalleryImage = {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  category: string;
};

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index');

      if (data) setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages = images.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  );

  const placeholderImages = [
    {
      id: '1',
      title: 'Cloud Infrastructure Architecture',
      image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern cloud architecture design',
      category: 'architecture',
    },
    {
      id: '2',
      title: 'DevOps Pipeline Visualization',
      image_url: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'CI/CD pipeline workflow',
      category: 'pipelines',
    },
    {
      id: '3',
      title: 'Container Orchestration',
      image_url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Kubernetes cluster management',
      category: 'containers',
    },
    {
      id: '4',
      title: 'Terminal & Code Editor',
      image_url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Development environment setup',
      category: 'terminal',
    },
    {
      id: '5',
      title: 'Server Infrastructure',
      image_url: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Data center operations',
      category: 'infrastructure',
    },
    {
      id: '6',
      title: 'Cloud Native Development',
      image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern development practices',
      category: 'development',
    },
  ];

  const displayImages = filteredImages.length > 0 ? filteredImages : placeholderImages;

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Visual Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore cloud architectures, DevOps pipelines, and real-world infrastructure designs
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => setSelectedImage(image)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.image_url}
                alt={image.title || 'Gallery image'}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {image.title && (
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-gray-200 text-sm">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
              >
                Close ✕
              </button>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title || 'Gallery image'}
                className="w-full h-auto rounded-lg"
              />
              {selectedImage.title && (
                <div className="mt-4 text-center">
                  <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-gray-300">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
