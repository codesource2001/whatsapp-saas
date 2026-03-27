# WhatsApp SaaS

A comprehensive Software-as-a-Service platform for WhatsApp business automation, messaging, and management.

## Project Overview

WhatsApp SaaS is a powerful platform designed to help businesses automate their WhatsApp communications, manage customer interactions, and streamline messaging workflows. Whether you're looking to send bulk messages, create automated workflows, or manage customer support through WhatsApp, this platform provides a robust, scalable solution.

### Key Features

- **Bulk Messaging**: Send messages to multiple contacts at scale
- **Workflow Automation**: Create automated message workflows based on triggers
- **Contact Management**: Organize and manage your WhatsApp contacts efficiently
- **Analytics & Reporting**: Track message delivery, open rates, and engagement metrics
- **API Integration**: Easy-to-use REST API for custom integrations
- **Template Management**: Pre-built message templates for common use cases
- **Webhook Support**: Real-time notifications for message events
- **Multi-account Support**: Manage multiple WhatsApp business accounts

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WhatsApp Business Account
- MongoDB or PostgreSQL

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/codesource2001/whatsapp-saas.git
   cd whatsapp-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/whatsapp-saas
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
   WHATSAPP_BUSINESS_PHONE_ID=your_phone_id
   WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
   API_KEY=your_api_key_here
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t whatsapp-saas .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env whatsapp-saas
   ```

### Production Deployment

For production deployments:

1. Set `NODE_ENV=production` in your `.env` file
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start app.js --name "whatsapp-saas"
   pm2 save
   ```
3. Configure a reverse proxy (Nginx/Apache)
4. Set up SSL certificates
5. Configure database backups

## Usage Examples

### Sending a Simple Message

```javascript
const WhatsAppSaaS = require('whatsapp-saas');

const client = new WhatsAppSaaS({
  accountId: 'YOUR_ACCOUNT_ID',
  phoneId: 'YOUR_PHONE_ID',
  accessToken: 'YOUR_ACCESS_TOKEN'
});

// Send a message
client.messages.send({
  to: '1234567890',
  message: 'Hello from WhatsApp SaaS!',
  type: 'text'
}).then(response => {
  console.log('Message sent:', response.messageId);
}).catch(error => {
  console.error('Error sending message:', error);
});
```

### Sending Bulk Messages

```javascript
const contacts = [
  { phone: '1234567890', name: 'John' },
  { phone: '0987654321', name: 'Jane' }
];

client.messages.sendBulk({
  contacts: contacts,
  message: 'Special offer just for you!',
  type: 'text'
}).then(response => {
  console.log('Bulk send completed:', response.successCount, 'sent');
});
```

### Creating a Workflow

```javascript
client.workflows.create({
  name: 'Welcome Workflow',
  trigger: 'new_contact',
  actions: [
    {
      type: 'send_message',
      delay: 0,
      message: 'Welcome to our service!'
    },
    {
      type: 'send_message',
      delay: 3600, // 1 hour later
      message: 'Here is our product catalog...'
    }
  ]
}).then(workflow => {
  console.log('Workflow created:', workflow.id);
});
```

### Handling Webhooks

```javascript
app.post('/webhook', (req, res) => {
  const { message, status } = req.body;
  
  if (status === 'delivered') {
    console.log('Message delivered:', message.id);
  } else if (status === 'read') {
    console.log('Message read:', message.id);
  }
  
  res.status(200).send('OK');
});
```

## API Documentation

### Base URL
```
https://api.whatsapp-saas.com/v1
```

### Authentication
All API requests require an API key in the header:
```
Authorization: Bearer YOUR_API_KEY
```

### Main Endpoints

#### Messages
- `POST /messages/send` - Send a single message
- `POST /messages/send-bulk` - Send bulk messages
- `GET /messages/:id` - Get message details
- `GET /messages` - List messages

#### Contacts
- `POST /contacts` - Create a new contact
- `GET /contacts` - List all contacts
- `PUT /contacts/:id` - Update a contact
- `DELETE /contacts/:id` - Delete a contact

#### Workflows
- `POST /workflows` - Create a workflow
- `GET /workflows` - List workflows
- `PUT /workflows/:id` - Update a workflow
- `DELETE /workflows/:id` - Delete a workflow

#### Analytics
- `GET /analytics/messages` - Message analytics
- `GET /analytics/contacts` - Contact analytics
- `GET /analytics/workflows` - Workflow performance

## Contributing Guidelines

We welcome contributions to WhatsApp SaaS! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards

- Follow the existing code style and formatting
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Use meaningful variable and function names

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.js
```

### Reporting Issues

When reporting issues, please include:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)
- Any error messages or logs

### Pull Request Process

1. Ensure your code passes all tests
2. Update the README.md if needed
3. Add a clear description of your changes
4. Link any related issues
5. Wait for review and address feedback

## Testing

Run the test suite with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Support

For support and questions:
- 📧 Email: support@whatsapp-saas.com
- 💬 Discord: [Join our community](https://discord.gg/whatsapp-saas)
- 📖 Documentation: [Full docs](https://docs.whatsapp-saas.com)
- 🐛 Issues: [GitHub Issues](https://github.com/codesource2001/whatsapp-saas/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.

## Roadmap

- [ ] WhatsApp Web automation
- [ ] Advanced AI-powered chatbots
- [ ] Payment integration
- [ ] CRM integration
- [ ] Multi-language support
- [ ] Enhanced analytics dashboard

---

**Built with ❤️ by the WhatsApp SaaS Team**