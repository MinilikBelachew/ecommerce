// app/about/page.jsx
export default function AboutPage() {
    const team = [
      {
        name: 'John Doe',
        role: 'CEO & Founder',
        image: '/face/face1.jpg',
        bio: 'Passionate about creating amazing customer experiences.',
      },
      {
        name: 'Jane Smith',
        role: 'CTO',
        image: '/face/face4.jpg',
        bio: 'Tech enthusiast with 15+ years of industry experience.',
      },
      {
        name: 'Mike Johnson',
        role: 'Design Lead',
        image: '/face/face21.jpg',
        bio: 'Creative mind behind our product aesthetics.',
      },
    ];
  
    const stats = [
      { label: 'Years of Experience', value: '10+' },
      { label: 'Happy Customers', value: '50k+' },
      { label: 'Products Sold', value: '100k+' },
      { label: 'Team Members', value: '50+' },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto opacity-0 translate-y-4 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 text-black">Our Story</h1>
              <p className="text-gray-600 text-lg">
                Building the future of e-commerce, one product at a time.
              </p>
            </div>
  
            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold mb-4 text-black">Our Mission</h2>
                <p className="text-gray-600">
                  To provide exceptional products and services that enhance our customers' lives while 
                  maintaining the highest standards of quality and customer satisfaction.
                </p>
              </div>
  
              <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold mb-4 text-black">Our Vision</h2>
                <p className="text-gray-600">
                  To become the world's most trusted e-commerce platform, known for innovation, 
                  quality, and customer-centric approach.
                </p>
              </div>
            </div>
  
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Team Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-black">Meet Our Team</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-blue-500 mb-4">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Values Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Innovation',
                    description: 'Constantly pushing boundaries and embracing new technologies.',
                  },
                  {
                    title: 'Quality',
                    description: 'Delivering excellence in every product and service.',
                  },
                  {
                    title: 'Integrity',
                    description: 'Building trust through honest and ethical practices.',
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="text-center transition-transform duration-300 hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }