<<<<<<< HEAD
# C++ ChatBot

A simple command-line chatbot built with C++ that can engage in basic conversations.

## Features

- **Pattern-based responses**: Recognizes keywords and responds appropriately
- **Random response selection**: Provides varied responses to keep conversations interesting
- **Case-insensitive input**: Works regardless of input capitalization
- **Multiple conversation topics**: Handles greetings, farewells, questions about itself, and more
- **Graceful exit**: Type 'quit' or 'exit' to end the conversation

## Supported Conversation Topics

- Greetings (hello, hi, hey, good morning, etc.)
- Farewells (bye, goodbye, see you, etc.)
- "How are you?"
- "What is your name?"
- "Help" - for usage information
- Weather-related questions
- Time-related questions
- Questions about favorites
- General conversation with fallback responses

## Requirements

- C++ compiler (g++ recommended)
- C++11 support or later
- Make (optional, for using Makefile)

## Building and Running

### Option 1: Using Makefile (Recommended)

```bash
# Build the chatbot
make

# Run the chatbot
make run

# Clean build files
make clean

# Show help
make help
```

### Option 2: Manual Compilation

```bash
# Compile the chatbot
g++ -std=c++11 -Wall -Wextra -O2 -o chatbot chatbot.cpp

# Run the chatbot
.\chatbot
```

## Usage

1. Start the chatbot by running the executable
2. Type your messages and press Enter
3. The chatbot will respond based on recognized patterns
4. Type 'quit' or 'exit' to end the conversation

## Example Conversation

```
=== C++ ChatBot ===
Hello! I'm your friendly chatbot. Type 'quit' or 'exit' to end our conversation.
===================

You: Hello!
ChatBot: Hi there! What's on your mind?

You: What's your name?
ChatBot: I'm ChatBot, your friendly AI assistant!

You: How are you?
ChatBot: I'm doing great, thank you for asking!

You: quit
ChatBot: Goodbye! Have a great day!
```

## Code Structure

The chatbot is implemented as a single C++ class with the following key components:

- **Response Management**: Uses maps and vectors to store and retrieve responses
- **Input Processing**: Converts input to lowercase and matches against keywords
- **Random Response Selection**: Uses random number generation for varied responses
- **Conversation Loop**: Maintains the chat session until user exits

## Customization

You can easily customize the chatbot by:

1. Adding new response patterns in the `initializeResponses()` method
2. Expanding the keyword lists for greetings and farewells
3. Adding new conversation topics by creating new entries in the `responses` map
4. Modifying the default responses for unrecognized input

## Future Enhancements

Possible improvements include:

- Integration with external APIs (weather, news, etc.)
- Machine learning-based responses
- Persistent conversation history
- Web interface
- Voice input/output
- Multi-language support

## License

This project is open source and available under the MIT License.

"# backend-and-frontend-course-registration-system" 
"# backend-and-frontend-course-registration-system" 
"# backend-and-frontend-course-registration-system" 
"# Magical-Pets-Kingdom-OOP-Project-SFML" 
=======
# Usman Azhar - Portfolio Website

A stunning 3D portfolio website built with modern web technologies, featuring interactive animations, particle effects, and a professional design.

## 🚀 Features

- **3D Animations**: Interactive 3D effects and hover animations
- **Particle Background**: Dynamic particle system with interactive elements
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Beautiful gradient designs and smooth transitions
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Project Showcase**: 10 project slots with detailed information
- **Skills Section**: Comprehensive technology stack display
- **Contact Form**: Functional contact form with validation

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Advanced styling with animations and 3D transforms
- **JavaScript**: Interactive functionality and animations
- **Particles.js**: Dynamic particle background system
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
My Portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Design Features

### Hero Section
- Animated technology icons in circular arrangement
- Gradient text effects and glowing elements
- Interactive particle background
- Professional tagline and call-to-action

### About Section
- Personal information and education details
- Professional profile card with status indicator
- Specializations and background information

### Skills Section
- Categorized technology skills
- Interactive skill items with hover effects
- Comprehensive tech stack coverage

### Projects Section
- 10 featured project cards
- 3D hover effects and overlays
- Technology tags and project links
- Responsive grid layout

### Contact Section
- Contact information and social links
- Functional contact form with validation
- Professional layout and styling

## 🚀 Getting Started

1. **Clone or Download**: Download the project files
2. **Open**: Open `index.html` in a web browser
3. **Customize**: Modify the content in `index.html` to match your information
4. **Deploy**: Upload to any web hosting service

## 🎯 Customization

### Personal Information
Update the following in `index.html`:
- Name and title in the hero section
- About section content
- Contact information
- Social media links

### Projects
Replace the project cards in the projects section with your actual projects:
- Project titles and descriptions
- Technology stacks
- Project links (GitHub, live demo)

### Styling
Modify `styles.css` to customize:
- Color scheme and gradients
- Fonts and typography
- Animation timings
- Layout and spacing

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🌟 Key Animations

- **Floating Tech Icons**: Rotating and floating technology icons
- **3D Card Effects**: Hover effects on project and skill cards
- **Particle System**: Interactive background particles
- **Smooth Scrolling**: Seamless navigation between sections
- **Fade-in Animations**: Content appears as you scroll
- **Gradient Text**: Animated gradient text effects

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Usman Azhar**
- Software Engineering Student at FAST
- Full Stack MERN Developer
- AI Solutions Specialist
- Machine Learning Enthusiast

---

*Built with ❤️ and modern web technologies*

>>>>>>> fd30396 (first commit')
