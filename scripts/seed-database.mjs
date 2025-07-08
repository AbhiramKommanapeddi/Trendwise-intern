import { connectDB } from '../src/lib/mongodb';
import User from '../src/models/User';
import BlogPost from '../src/models/BlogPost';
import TrendingTopic from '../src/models/TrendingTopic';

// Sample data
const sampleUser = {
  name: "TrendWise AI",
  email: "ai@trendwise.com",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "admin",
  bio: "AI-powered content creator specializing in trending topics and insights."
};

const samplePosts = [
  {
    title: "The Rise of AI in 2025: Transforming Industries Beyond Recognition",
    slug: "rise-of-ai-2025-transforming-industries",
    excerpt: "Artificial Intelligence is revolutionizing every sector from healthcare to finance. Discover the latest breakthroughs and what they mean for the future.",
    content: `<h2>The AI Revolution is Here</h2>
<p>As we advance through 2025, artificial intelligence has moved from science fiction to everyday reality. The transformation is happening faster than anyone predicted, with AI systems now capable of complex reasoning, creative tasks, and human-like interactions.</p>

<h3>Key Industries Being Transformed</h3>
<ul>
<li><strong>Healthcare:</strong> AI diagnostics are now more accurate than human doctors in many specialties</li>
<li><strong>Finance:</strong> Algorithmic trading and fraud detection have reached new levels of sophistication</li>
<li><strong>Transportation:</strong> Autonomous vehicles are becoming mainstream in major cities</li>
<li><strong>Education:</strong> Personalized learning experiences powered by AI tutors</li>
</ul>

<h3>The Future Outlook</h3>
<p>Experts predict that by 2030, AI will be integrated into virtually every aspect of human life. The key is ensuring this transformation benefits everyone, not just a select few.</p>

<blockquote>"The question isn't whether AI will change everything—it's how we'll adapt to harness its power responsibly." - Tech Industry Leader</blockquote>`,
    category: "Technology",
    tags: ["AI", "Machine Learning", "Future Tech", "Innovation"],
    status: "published",
    publishedAt: new Date('2025-01-15'),
    viewCount: 1250,
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    seoTitle: "The Rise of AI in 2025: Transforming Industries | TrendWise",
    seoDescription: "Discover how AI is revolutionizing industries in 2025. Expert insights on the latest breakthroughs in artificial intelligence and their impact on the future."
  },
  {
    title: "Sustainable Business Practices: The New Competitive Advantage",
    slug: "sustainable-business-practices-competitive-advantage",
    excerpt: "Companies embracing sustainability aren't just doing good—they're outperforming competitors. Learn why green practices are the key to long-term success.",
    content: `<h2>Sustainability as a Business Strategy</h2>
<p>The business landscape has fundamentally shifted. Sustainability is no longer just about corporate social responsibility—it's become a critical competitive advantage that drives profitability and growth.</p>

<h3>The Financial Benefits</h3>
<p>Recent studies show that companies with strong environmental, social, and governance (ESG) practices consistently outperform their peers:</p>
<ul>
<li>23% higher profit margins on average</li>
<li>Lower operational costs through efficiency improvements</li>
<li>Access to green financing at preferential rates</li>
<li>Higher employee retention and productivity</li>
</ul>

<h3>Consumer Demand Driving Change</h3>
<p>Modern consumers, especially millennials and Gen Z, are willing to pay premium prices for sustainable products. This shift in consumer behavior is forcing businesses to rethink their entire value chain.</p>`,
    category: "Business",
    tags: ["Sustainability", "ESG", "Green Business", "Corporate Strategy"],
    status: "published",
    publishedAt: new Date('2025-01-12'),
    viewCount: 890,
    featuredImage: "https://images.unsplash.com/photo-1497436072909-f9e2b4f19dda?w=800&h=400&fit=crop",
    seoTitle: "Sustainable Business Practices: Competitive Advantage 2025 | TrendWise",
    seoDescription: "Learn why sustainable business practices are the new competitive advantage. Discover strategies for implementing ESG practices that drive profitability."
  },
  {
    title: "CRISPR 3.0: The Next Generation of Gene Editing is Here",
    slug: "crispr-3-next-generation-gene-editing",
    excerpt: "Scientists have unveiled CRISPR 3.0, offering unprecedented precision in gene editing. This breakthrough could revolutionize medicine and agriculture.",
    content: `<h2>A New Era in Genetic Engineering</h2>
<p>The latest advancement in CRISPR technology, dubbed CRISPR 3.0, represents a quantum leap in our ability to edit genes with precision and safety. This new system addresses many of the limitations that have held back clinical applications.</p>

<h3>What Makes CRISPR 3.0 Different</h3>
<ul>
<li><strong>Enhanced Precision:</strong> 99.9% accuracy with minimal off-target effects</li>
<li><strong>Reversible Edits:</strong> Ability to undo genetic modifications if needed</li>
<li><strong>Reduced Immunogenicity:</strong> Lower risk of immune system reactions</li>
<li><strong>Faster Results:</strong> Gene edits take effect in hours rather than days</li>
</ul>

<blockquote>"CRISPR 3.0 isn't just an improvement—it's a paradigm shift that will redefine what's possible in medicine." - Dr. Sarah Chen, Lead Geneticist</blockquote>`,
    category: "Science",
    tags: ["CRISPR", "Gene Editing", "Biotechnology", "Medical Innovation"],
    status: "published",
    publishedAt: new Date('2025-01-10'),
    viewCount: 2100,
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    seoTitle: "CRISPR 3.0: Next Generation Gene Editing Technology | TrendWise",
    seoDescription: "Discover CRISPR 3.0, the revolutionary gene editing technology that's transforming medicine. Learn about its applications and ethical implications."
  },
  {
    title: "The Mental Health Tech Boom: Apps That Actually Work",
    slug: "mental-health-tech-boom-apps-that-work",
    excerpt: "Mental health apps are finally delivering on their promises. Discover which platforms are making a real difference in people's lives.",
    content: `<h2>Digital Therapy Revolution</h2>
<p>The mental health crisis has sparked innovation in digital therapeutics. Unlike early apps that offered little more than meditation timers, today's platforms provide evidence-based interventions that rival traditional therapy.</p>

<h3>What Makes These Apps Effective</h3>
<ul>
<li><strong>AI-Powered Personalization:</strong> Tailored interventions based on user behavior and needs</li>
<li><strong>Clinical Validation:</strong> Rigorous testing in peer-reviewed studies</li>
<li><strong>Professional Integration:</strong> Seamless connection with licensed therapists</li>
<li><strong>Real-Time Support:</strong> Crisis intervention and immediate assistance</li>
</ul>

<p>While these tools are powerful, they're not replacement for professional help in severe cases. The best outcomes occur when digital tools complement traditional therapy and medical care.</p>`,
    category: "Health",
    tags: ["Mental Health", "Digital Therapeutics", "Healthcare Tech", "Wellness"],
    status: "published",
    publishedAt: new Date('2025-01-08'),
    viewCount: 1680,
    featuredImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
    seoTitle: "Mental Health Tech Boom: Apps That Actually Work | TrendWise",
    seoDescription: "Explore the mental health app revolution. Discover which digital therapeutics are making a real difference in treating anxiety, depression, and wellness."
  },
  {
    title: "Remote Work 3.0: The Hybrid Future of Employment",
    slug: "remote-work-3-hybrid-future-employment",
    excerpt: "The workplace is evolving beyond traditional remote work. Discover how hybrid models are reshaping employment and company culture.",
    content: `<h2>Beyond the Remote Work Debate</h2>
<p>The conversation has moved past "remote vs. office" to a more nuanced understanding of hybrid work models. Companies are discovering that the future lies in flexibility, not rigid structures.</p>

<h3>The New Hybrid Models</h3>
<ul>
<li><strong>Hub and Spoke:</strong> Multiple smaller offices instead of one headquarters</li>
<li><strong>Activity-Based Working:</strong> Different spaces for different types of work</li>
<li><strong>Flexible Scheduling:</strong> Employees choose when and where to work</li>
<li><strong>Results-Only Environments:</strong> Focus on outcomes, not hours worked</li>
</ul>

<h3>Benefits for Companies and Employees</h3>
<p>While hybrid work offers many benefits, companies must address challenges like maintaining company culture, ensuring equal opportunities for remote and in-office workers, and managing cybersecurity risks.</p>`,
    category: "Business",
    tags: ["Remote Work", "Hybrid Work", "Future of Work", "Employee Engagement"],
    status: "published",
    publishedAt: new Date('2025-01-05'),
    viewCount: 1420,
    featuredImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    seoTitle: "Remote Work 3.0: The Hybrid Future of Employment | TrendWise",
    seoDescription: "Discover the evolution of remote work into flexible hybrid models. Learn how companies are reshaping employment for the post-pandemic world."
  }
];

const trendingTopics = [
  {
    keyword: "Artificial Intelligence 2025",
    searchVolume: 125000,
    category: "Technology",
    relevanceScore: 95
  },
  {
    keyword: "Sustainable Business Practices",
    searchVolume: 89000,
    category: "Business",
    relevanceScore: 88
  },
  {
    keyword: "CRISPR Gene Editing",
    searchVolume: 67000,
    category: "Science",
    relevanceScore: 92
  },
  {
    keyword: "Mental Health Technology",
    searchVolume: 78000,
    category: "Health",
    relevanceScore: 85
  },
  {
    keyword: "Hybrid Work Models",
    searchVolume: 95000,
    category: "Business",
    relevanceScore: 90
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    await TrendingTopic.deleteMany({});

    console.log('Cleared existing data');

    // Create sample user
    const user = await User.create(sampleUser);
    console.log('Created sample user:', user.name);

    // Create blog posts with the user as author
    const postsWithAuthor = samplePosts.map(post => ({
      ...post,
      author: user._id
    }));

    const createdPosts = await BlogPost.insertMany(postsWithAuthor);
    console.log(`Created ${createdPosts.length} blog posts`);

    // Create trending topics
    const createdTopics = await TrendingTopic.insertMany(trendingTopics);
    console.log(`Created ${createdTopics.length} trending topics`);

    console.log('✅ Database seeded successfully!');
    console.log('You can now visit your TrendWise blog and see the articles.');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase();
