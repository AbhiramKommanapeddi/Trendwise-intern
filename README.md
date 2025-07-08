# TrendWise - AI-Powered Blog Platform

TrendWise is a full-stack, SEO-optimized blog platform built with Next.js 14+ that fetches trending topics and uses AI to generate engaging content.

## 🚀 Features

- **AI-Powered Content Generation**: Uses OpenAI API to generate SEO-optimized blog posts
- **Trending Topics Crawler**: Fetches trending topics from Google and other sources using Puppeteer
- **User Authentication**: Google OAuth integration with NextAuth.js
- **Comment System**: Authenticated users can comment on articles
- **Admin Dashboard**: Content management and analytics for administrators
- **SEO Optimized**: Dynamic sitemap, robots.txt, meta tags, and Open Graph tags
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Modern Stack**: Next.js 14+, TypeScript, MongoDB, and more

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: OpenAI API for content generation
- **Web Crawling**: Puppeteer for trending topics
- **Styling**: TailwindCSS with custom components
- **Deployment**: Vercel-ready configuration

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd trendwise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.local` and fill in your credentials:

   ```bash
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth (Get from Google Cloud Console)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # OpenAI API (Get from OpenAI Dashboard)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Google OAuth**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **Set up MongoDB**

   - Create a MongoDB Atlas account or use local MongoDB
   - Create a new database named `trendwise`
   - Get your connection string

6. **Get OpenAI API Key**
   - Create an account at [OpenAI](https://platform.openai.com/)
   - Generate an API key from the dashboard

## 🚀 Running the Application

1. **Development mode**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production build**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog post pages
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── crawler.ts        # Web crawling logic
│   ├── mongodb.ts        # Database connection
│   ├── openai.ts         # OpenAI integration
│   └── utils.ts          # Utility functions
├── models/               # Mongoose models
└── types/                # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

| Variable               | Description                | Required |
| ---------------------- | -------------------------- | -------- |
| `MONGODB_URI`          | MongoDB connection string  | Yes      |
| `NEXTAUTH_URL`         | Application URL            | Yes      |
| `NEXTAUTH_SECRET`      | NextAuth secret key        | Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID     | Yes      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes      |
| `OPENAI_API_KEY`       | OpenAI API key             | Yes      |

### Admin Setup

1. Sign in with Google OAuth
2. Update your user role to 'admin' in the MongoDB database:
   ```javascript
   db.users.updateOne(
     { email: "your-email@gmail.com" },
     { $set: { role: "admin" } }
   );
   ```

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**

   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Update OAuth settings** with your Vercel URL

### Deploy to other platforms

The application is built with standard Next.js, so it can be deployed to:

- Netlify
- Railway
- Heroku
- AWS
- DigitalOcean App Platform

## 📝 Usage

### For Administrators

1. **Access Admin Dashboard**: `/admin`
2. **Generate Content**: Use AI to create posts from trending topics
3. **Manage Posts**: Edit, publish, or delete posts
4. **Update Trends**: Manually refresh trending topics

### For Users

1. **Browse Articles**: View all published articles on homepage
2. **Read Articles**: Click on any article to read full content
3. **Comment**: Sign in with Google to comment on articles
4. **Search**: Use the search bar to find specific articles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🚧 Roadmap

- [ ] Email notifications for new posts
- [ ] Social media sharing
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Image upload functionality
- [ ] Newsletter subscription
- [ ] RSS feed
- [ ] Dark mode

---

**Built with ❤️ using Next.js, TypeScript, and AI**
