# Avsar - Rural Sports Platform

A modern Next.js 14 application for connecting athletes, panchayats, and tournament organizers in rural communities.

## 🎯 Features

- **Authentication**: Email/password signup with role selection
- **Role-Based Access**: Athlete, Panchayat, Organizer dashboards
- **Community Feed**: Share posts, connect with others
- **Sports Management**: Manage grounds, tournaments, and events
- **Mobile-First Design**: Built for rural users with large, clear text

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (Supabase, Neon, or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BuildWithShivendra/avsar.git
   cd avsar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/avsar"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-key"
   ```

4. **Set up Prisma**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Create database and run migrations
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
avsar/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts          # NextAuth API route
│   │   │   └── register/
│   │   │       └── route.ts          # Registration endpoint
│   │   └── posts/
│   │       └── route.ts              # Posts API (GET/POST)
│   ├── community/
│   │   └── page.tsx                  # Community feed page
│   ├── dashboard/
│   │   ├── athlete/
│   │   │   └── page.tsx              # Athlete dashboard
│   │   ├── panchayat/
│   │   │   └── page.tsx              # Panchayat dashboard
│   │   └── organizer/
│   │       └── page.tsx              # Organizer dashboard
│   ├── login/
│   │   └── page.tsx                  # Login page
│   ├── register/
│   │   └── page.tsx                  # Registration page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Landing page
├── components/
│   ├── AuthProvider.tsx              # Auth context provider
│   ├── CommunityFeed.tsx             # Community feed component
│   └── Navbar.tsx                    # Navigation bar
├── lib/
│   ├── auth.ts                       # Password utilities
│   ├── auth-config.ts                # NextAuth configuration
│   ├── auth-middleware.ts            # Auth middleware
│   └── prisma.ts                     # Prisma client
├── prisma/
│   └── schema.prisma                 # Database schema
├── package.json                      # Dependencies
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── next.config.js                    # Next.js configuration
```

## 🗄️ Database Schema

### User
- `id`: Unique identifier
- `email`: Email address (unique)
- `password`: Hashed password
- `name`: User's name
- `role`: USER_ROLE (ATHLETE, PANCHAYAT, ORGANIZER)
- `createdAt`, `updatedAt`: Timestamps

### AthleteProfile
- `userId`: Reference to User
- `age`, `sport`, `village`, `achievements`

### PanchayatProfile
- `userId`: Reference to User
- `village`, `description`
- Relations: `grounds` (one-to-many)

### OrganizerProfile
- `userId`: Reference to User
- `organization`, `description`
- Relations: `tournaments` (one-to-many)

### Post
- `id`: Unique identifier
- `userId`: Reference to User
- `title`, `content`
- `aiSummary`, `aiTags`: Optional AI fields
- Relations: `comments`, `likes` (one-to-many)

### Comment & Like
- Linked to Post and User

## 🔐 Authentication

- **Provider**: NextAuth.js with Credentials
- **Strategy**: JWT-based sessions
- **Password**: Hashed with bcryptjs
- **Role-Based Redirect**: Users redirected to appropriate dashboard after login

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Design**: Mobile-first, large text (16px+)
- **Colors**: 
  - Primary: Green (#10b981)
  - Secondary: Amber (#f59e0b)
- **Suitable for rural users** with simple, clear UI

## 📚 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma commands
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🚀 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
5. Deploy!

## 📖 API Documentation

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/signin` - Login (handled by NextAuth)
- `GET /api/auth/session` - Get current session

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (requires auth)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your needs.

## 🆘 Support

For issues and questions, please open an issue on GitHub.

---

**Tagline**: Every Village Deserves a Place to Play 🏃‍♂️⚽
