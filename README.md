⚠️ This is an **unofficial** project and is **not affiliated with or endorsed by LM Studio**.

# LM Studio Chat WebUI(unofficial)

This is a simple, browser-based chat interface for interacting with your LM Studio server. It allows you to connect to your locally hosted LM Studio model and chat with it from any device with a web browser, including mobile phones.

## Features

- Dark mode interface
- Connect to any LM Studio server
- Chat with your LM Studio model
- LaTeX Math Rendering and Markdown Rendering
- Mobile-friendly design
- Super Cool new Purple theme **NEW**
- Chats **NEW**
- Vision Model Support **NEW**
- Choose your model **NEW**
- Delete Chats **NEW**
- Long-term chat memory stored in SQLite **NEW**


## Screenshots 📸
![image](https://github.com/user-attachments/assets/7944a30a-6e52-467b-bf27-309f8db0bfde)
![image](https://github.com/user-attachments/assets/cecc2e50-1583-4ce6-a092-10adcb2359f3)
![image](https://github.com/user-attachments/assets/717bb8c6-ff62-4574-95e4-146909302180)
![image](https://github.com/user-attachments/assets/22275a46-f332-4ab9-b727-678a98aef7af)
![image](https://github.com/user-attachments/assets/d7cba468-166b-4d74-a98a-37ca72093b83)




## Setup Instructions

### For Desktop Users

1. Download the `lmstudiowebui.html` file from this repository.
2. Save it to a location on your computer that you can easily access.

### For Mobile Users
This works out of the box on Android devices. For iOS you need to open the file in Microsoft Edge or another browser. Safari/Chrome do not work. 
There are several ways to get the `lmstudiowebui.html` file on your mobile device:

1. **Direct Download**: 
   - Open this repository on your mobile device's web browser.
   - Find the `lmstudiowebui.html` file and download it directly to your device.

2. **Email to Yourself**:
   - Download the `lmstudiowebui.html` file on your computer.
   - Email it to yourself as an attachment.
   - Open the email on your mobile device and download the attachment.

3. **Cloud Storage**:
   - Upload the `lmstudiowebui.html` file to a cloud storage service like Google Drive, Dropbox, or iCloud.
   - Access the file from your mobile device using the respective cloud storage app.

4. **File Transfer Apps**:
   - Use apps like AirDrop (for iOS devices) or nearby sharing (for Android devices) to transfer the file from your computer to your mobile device.

## Usage Instructions

1. **Start LM Studio Server**:
   - Open LM Studio on your computer.
   - Go to the "Server" tab (In 0.3.x -> Developer -> Local Server).
   - Ensure that CORS is enabled and Serve on Local Network is enabled.
   - Click "Start Server" and note down the server address.

2. **Open the Chat Interface**:
   - On desktop: Double-click the `lmstudiowebui.html` file to open it in your default web browser.
   - On mobile: Use a file manager app to locate the downloaded `lmstudiowebui.html` file and open it with your web browser.

3. **Connect to LM Studio Server**:
   - In the chat interface, enter the LM Studio server address in the input field at the top. 
   - Click the "Connect" button.

4. **Start Chatting**:
   - Once connected, you can start typing messages in the input field at the bottom of the screen.
   - Press Enter or tap Send to send your message.
   - The model's responses will appear in the chat window.

## Troubleshooting

- **Can't connect to server**: 
  - Ensure LM Studio Server is running on your computer.
  - Check that you're using the correct server address.
  - If accessing from another device, make sure both devices are on the same network.

- **Slow responses**: 
  - LM Studio processing speed depends on your computer's capabilities. Larger models may take longer to respond.

- **Interface not loading**: 
  - Try opening the `lmstudiowebui.html` file with a different web browser.

## Security Note

This interface is designed for local use only. Do not expose your LM Studio server to the public internet without proper security measures in place.

## Feedback and Contributions

This is a personal project. While the code is public for anyone to use and learn from, I am **not accepting pull requests** for new features or bug fixes. If you find an issue or have a suggestion, please open an issue to discuss it.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YorkieDev/LMStudioWebUI&type=Date)](https://star-history.com/#YorkieDev/LMStudioWebUI&Date)

## Environment Configuration

Create a `.env` file in the project root to prefill connection details when the page loads:

```
SERVER_URL=http://localhost:1234
AUTH_TOKEN=alice:secret
```

`SERVER_URL` is required and should point to your LM Studio server. `AUTH_TOKEN` may either be a bearer token or a `username:password` pair for servers using HTTP Basic authentication. Leave it blank if the server does not require authentication.

## Long-term Chat Memory

Run the optional Node.js server to store chats in a local SQLite database.

1. Install dependencies with `npm install`.
2. Start the server using `npm start`.
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Chats are persisted in the `chats.db` file and loaded automatically when the page opens.
