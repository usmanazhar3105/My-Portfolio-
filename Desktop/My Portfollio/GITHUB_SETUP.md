# GitHub Integration Setup Guide

## 🚀 How to Connect Your GitHub Account

### Step 1: Update Your GitHub Username
1. Open `script.js` file
2. Find line 388: `const GITHUB_USERNAME = 'yourusername';`
3. Replace `'yourusername'` with your actual GitHub username
4. Save the file

### Step 2: Update Project Links
1. Open `index.html` file
2. Find the project cards in the Projects section (around line 275)
3. Replace the `href="#"` links with your actual project URLs:

```html
<!-- Example for Project 1 -->
<a href="https://github.com/yourusername/ai-interview-assistant" class="project-link" target="_blank">
<a href="https://your-interview-assistant-demo.com" class="project-link" target="_blank">

<!-- Example for Project 2 -->
<a href="https://github.com/yourusername/ai-chatbot" class="project-link" target="_blank">
<a href="https://your-chatbot-demo.com" class="project-link" target="_blank">
```

### Step 3: Update Social Links
1. In `index.html`, find the social links (around line 26-30)
2. Replace the `href="#"` with your actual social media URLs:

```html
<a href="https://github.com/yourusername" class="social-link">
<a href="https://linkedin.com/in/yourusername" class="social-link">
<a href="https://twitter.com/yourusername" class="social-link">
```

### Step 4: Update GitHub Button Link
1. In `index.html`, find the GitHub button (around line 526)
2. Replace the URL with your GitHub profile:

```html
<a href="https://github.com/yourusername" class="github-btn" target="_blank">
```

## ✨ Features of the GitHub Section

### Real-time Data
- **Total Repositories**: Shows your public repository count
- **Total Stars**: Displays total stars across all repos
- **Total Forks**: Shows total forks across all repos
- **This Year Commits**: Displays commit count for current year

### Live Project Cards
- **Latest 6 Projects**: Shows your most recently updated repositories
- **Language Indicators**: Color-coded language dots
- **Star Counts**: Real-time star counts for each project
- **Direct Links**: Links to GitHub repo and live demo (if available)
- **Update Dates**: Shows when each project was last updated

### 3D Effects
- **Hover Animations**: Cards lift and rotate on hover
- **Gradient Borders**: Beautiful gradient top borders
- **Smooth Transitions**: All animations are smooth and professional
- **Loading States**: Elegant loading spinners while fetching data

## 🔧 Customization Options

### Change Number of Projects Displayed
In `script.js`, line 449, change `per_page=6` to any number:
```javascript
fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`)
```

### Add More Language Colors
In `script.js`, add more languages to the `languageColors` object:
```javascript
const languageColors = {
    'YourLanguage': '#yourcolor',
    // ... existing languages
};
```

### Modify Project Card Layout
Edit the `createProjectCard` function in `script.js` to customize the card content.

## 🚨 Important Notes

1. **CORS Issues**: The GitHub API works without authentication for public data, but you might need to use a CORS proxy for local development.

2. **Rate Limiting**: GitHub API has rate limits (60 requests per hour for unauthenticated requests).

3. **Error Handling**: The code includes error handling for failed API requests.

4. **Fallback Content**: If GitHub data fails to load, it shows a helpful error message.

## 🎯 Testing Your Setup

1. Open `index.html` in your browser
2. Navigate to the GitHub section
3. Check if your repositories load correctly
4. Verify all links work properly
5. Test the hover effects and animations

## 📱 Mobile Responsiveness

The GitHub section is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

All cards and statistics adapt to different screen sizes automatically.

---

**Need Help?** Check the browser console for any error messages if the GitHub data doesn't load properly.
