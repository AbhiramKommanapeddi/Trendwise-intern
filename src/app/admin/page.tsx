'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BlogPostWithAuthor, APIResponse, TrendingTopicData } from '@/types';
import { Plus, Edit, Trash2, TrendingUp, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [posts, setPosts] = useState<BlogPostWithAuthor[]>([]);
  const [trending, setTrending] = useState<TrendingTopicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [updatingTrends, setUpdatingTrends] = useState(false);

  // Content generation form
  const [contentForm, setContentForm] = useState({
    topic: '',
    category: 'Technology',
    keywords: '',
    length: 'medium' as 'short' | 'medium' | 'long',
    tone: 'professional' as 'professional' | 'casual' | 'academic',
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user) {
      signIn('google');
      return;
    }

    if (session.user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchPosts();
    fetchTrendingTopics();
  }, [session, status, router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts?published=false&limit=20');
      const data: APIResponse<{ posts: BlogPostWithAuthor[] }> = await response.json();

      if (data.success && data.data) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchTrendingTopics = async () => {
    try {
      const response = await fetch('/api/trending?limit=10');
      const data: APIResponse<TrendingTopicData[]> = await response.json();

      if (data.success && data.data) {
        setTrending(data.data);
      }
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTrends = async () => {
    setUpdatingTrends(true);
    try {
      const response = await fetch('/api/trending', { method: 'POST' });
      const data: APIResponse = await response.json();

      if (data.success) {
        await fetchTrendingTopics();
        alert('Trending topics updated successfully!');
      } else {
        alert(data.error || 'Failed to update trending topics');
      }
    } catch (error) {
      console.error('Error updating trends:', error);
      alert('Failed to update trending topics');
    } finally {
      setUpdatingTrends(false);
    }
  };

  const handleGenerateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentForm.topic.trim() || !contentForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    setGeneratingContent(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: contentForm.topic.trim(),
          category: contentForm.category,
          keywords: contentForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
          length: contentForm.length,
          tone: contentForm.tone,
        }),
      });

      const data: APIResponse<BlogPostWithAuthor> = await response.json();

      if (data.success && data.data) {
        await fetchPosts();
        setContentForm({
          topic: '',
          category: 'Technology',
          keywords: '',
          length: 'medium',
          tone: 'professional',
        });
        alert('Content generated successfully!');
      } else {
        alert(data.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content');
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      const data: APIResponse = await response.json();

      if (data.success) {
        setPosts(posts.filter(post => post.slug !== slug));
        alert('Post deleted successfully!');
      } else {
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handlePublishPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: true }),
      });

      const data: APIResponse = await response.json();

      if (data.success) {
        await fetchPosts();
        alert('Post published successfully!');
      } else {
        alert(data.error || 'Failed to publish post');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Failed to publish post');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          user={session?.user}
          onSignIn={() => signIn('google')}
          onSignOut={() => signOut()}
        />
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={session?.user}
        onSignIn={() => signIn('google')}
        onSignOut={() => signOut()}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage content, trends, and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Draft Posts</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trending Topics</p>
                <p className="text-2xl font-bold text-gray-900">{trending.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Generated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {posts.filter(p => p.author.email === session.user?.email).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Generation */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Generate Content
              </h2>
            </div>
            
            <form onSubmit={handleGenerateContent} className="p-6 space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <Input
                  id="topic"
                  type="text"
                  value={contentForm.topic}
                  onChange={(e) => setContentForm({ ...contentForm, topic: e.target.value })}
                  placeholder="e.g., AI in Healthcare, Future of Blockchain"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={contentForm.category}
                  onChange={(e) => setContentForm({ ...contentForm, category: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Science">Science</option>
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <Input
                  id="keywords"
                  type="text"
                  value={contentForm.keywords}
                  onChange={(e) => setContentForm({ ...contentForm, keywords: e.target.value })}
                  placeholder="AI, machine learning, healthcare"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <select
                    id="length"
                    value={contentForm.length}
                    onChange={(e) => setContentForm({ ...contentForm, length: e.target.value as 'short' | 'medium' | 'long' })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="short">Short (500-800 words)</option>
                    <option value="medium">Medium (1000-1500 words)</option>
                    <option value="long">Long (2000-3000 words)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    id="tone"
                    value={contentForm.tone}
                    onChange={(e) => setContentForm({ ...contentForm, tone: e.target.value as 'professional' | 'casual' | 'academic' })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={generatingContent}
                className="w-full"
              >
                {generatingContent ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </h2>
              <Button
                onClick={handleUpdateTrends}
                disabled={updatingTrends}
                size="sm"
              >
                {updatingTrends ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Updating...
                  </>
                ) : (
                  'Update Trends'
                )}
              </Button>
            </div>
            
            <div className="p-6">
              {trending.length > 0 ? (
                <div className="space-y-3">
                  {trending.map((topic) => (
                    <div
                      key={topic._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{topic.topic}</p>
                        <p className="text-sm text-gray-600">
                          {topic.category} • Score: {topic.relevanceScore}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setContentForm({ 
                          ...contentForm, 
                          topic: topic.topic,
                          category: topic.category 
                        })}
                      >
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No trending topics found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Draft Posts */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Draft Posts</h2>
            <Link href="/admin/post/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
          
          <div className="p-6">
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Category: {post.category}</span>
                          <span>Views: {post.viewCount}</span>
                          <span>
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePublishPost(post.slug)}
                        >
                          Publish
                        </Button>
                        <Link href={`/admin/post/edit/${post.slug}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePost(post.slug)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No draft posts found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
