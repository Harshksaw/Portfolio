export function SimpleContactSection() {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black text-white relative">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Build
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              Something Amazing
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Email Card */}
          <a
            href={links.email}
            className="group p-8 bg-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="text-4xl md:text-5xl mb-6">📧</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              Send an Email
            </h3>
            <p className="text-gray-400 mb-2">Get in touch directly</p>
            <p className="text-green-400 font-medium">hello@harshkumar.dev</p>
          </a>

          {/* Telegram Card */}
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer" 
            className="group p-8 bg-gray-800/60 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-gray-800/80"
          >
            <div className="text-4xl md:text-5xl mb-6">💬</div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              Chat on Telegram
            </h3>
            <p className="text-gray-400 mb-2">Quick responses guaranteed</p>
            <p className="text-blue-400 font-medium">@Harshkumar_dev</p>
          </a>
        </div>

        {/* Social Links */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-semibold text-gray-300 mb-8">Find me elsewhere</h3>
          <div className="flex justify-center gap-6">
            {[
              { name: "GitHub", url: links.github, icon: "👨‍💻", color: "hover:border-gray-400" },
              { name: "LinkedIn", url: links.linkedin, icon: "💼", color: "hover:border-blue-400" },
              { name: "Twitter", url: links.twitter, icon: "🐦", color: "hover:border-cyan-400" }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 bg-gray-800/60 rounded-xl border border-gray-700/50 ${social.color} transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl md:text-3xl`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-gray-700/50">
          <p className="text-gray-400 mb-4">
            Built with Next.js, TypeScript, and lots of ☕
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Harsh Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}