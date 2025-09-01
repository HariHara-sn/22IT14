# URL Shortener Application



### Core Functionality
- **URL Shortening**: Convert long URLs to short, manageable links
- **Custom Shortcodes**: Optionally provide custom shortcodes (3-20 characters, alphanumeric)
- **Auto-generation**: Automatic unique shortcode generation if none provided
- **Validity Period**: Configurable expiration time (default: 30 minutes)
- **Uniqueness**: All generated short links are guaranteed to be unique

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone or download the project**
   ```bash
   # If cloning from a repository
   git clone <repository-url>
   cd url-shortener
   
   # Or navigate to your project directory
   cd your-project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production
```bash
npm run build
npm run preview
```
