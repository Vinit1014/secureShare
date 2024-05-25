<h1>SecureShare Web App</h1>

<p>SecureShare is a web application designed for secure and efficient file transfer between registered users. This app prioritizes the security and privacy of its users by incorporating features such as private key encryption and a robust authentication system.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Registration and Login</strong>: Users can easily register and log in to the app.</li>
    <li><strong>Private Key Display</strong>: Upon successful login, users are shown a toast notification displaying their private key.</li>
    <li><strong>Secure File Transfer</strong>: Users can send files to any other registered user securely.</li>
    <li><strong>Inbox</strong>: Users can view files sent to them by others, and download them using their private key for decryption.</li>
    <li><strong>File Deletion</strong>: Users have the ability to delete files they no longer need.</li>
</ul>

<h3>Note:</h3>
<p>The app is designed for transferring small, important files due to the Supabase free tier storage limit of 87MB.</p>

<h2>Technologies Used</h2>
<ul>
    <li><strong>NextJS</strong>: React framework for server-rendered applications and static websites.</li>
    <li><strong>TypeScript</strong>: Type-safe JavaScript for enhanced code reliability.</li>
    <li><strong>Supabase</strong>: Backend-as-a-service providing authentication, storage, and database solutions.</li>
    <li><strong>TailwindCSS</strong>: Utility-first CSS framework for rapid UI development.</li>
</ul>

<h2>Setup and Installation</h2>
<p>To set up and run this project locally, follow these steps:</p>
<ol>
    <li><strong>Clone the Repository</strong>:
        <pre><code>git clone https://github.com/yourusername/secureshare.git
cd secureshare</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>:
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set Up Environment Variables</strong>:
        <p>Create a <code>.env.local</code> file in the root directory and add your Supabase keys and other necessary environment variables:</p>
        <pre><code>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</code></pre>
    </li>
    <li><strong>Run the Development Server</strong>:
        <pre><code>npm run dev</code></pre>
        <p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
    </li>
</ol>

<h2>Usage</h2>
<ol>
    <li><strong>Register</strong>: Sign up with a unique username and password.</li>
    <li><strong>Login</strong>: Log in with your credentials. Your private key will be shown in a toast notification.</li>
    <li><strong>Send File</strong>: Navigate to the file transfer section, enter the recipient's username, and upload the file.</li>
    <li><strong>Inbox</strong>: View incoming files, download, and decrypt them using your private key. You can also delete files you no longer need.</li>
</ol>

<h2>Contributing</h2>
<p>Contributions are welcome! Please open an issue or submit a pull request.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>

<h2>Acknowledgements</h2>
<ul>
    <li>Supabase for providing backend services.</li>
    <li>TailwindCSS for the beautiful and responsive UI design framework.</li>
    <li>The NextJS and TypeScript communities for their invaluable resources and support.</li>
</ul>
