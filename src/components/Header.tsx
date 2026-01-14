const Header = () => {
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Letter', href: '#letter' },
    { label: 'Wishes', href: '#wishes' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-handwritten text-aurora-gradient font-bold">
            Aurora
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-aurora-teal transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-aurora-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

