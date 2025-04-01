import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">
                            Sajilo <span className="text-primary">News</span>
                        </h3>
                        <p className="text-muted-foreground">
                            Your source for the latest news and updates. We
                            deliver timely, relevant, and trustworthy
                            information.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Nepal</span>
                        </div>
                        {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>+1 (555) 123-4567</span>
                        </div> */}
                        {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>contact@newsportal.com</span>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    {/* <div className="space-y-4">
                        <h4 className="font-medium text-lg">Quick Links</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/about"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Contact
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/faq"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                FAQ
                            </Link>
                        </nav>
                    </div> */}

                    {/* Newsletter & Social */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-lg">Stay Connected</h4>
                        <p className="text-muted-foreground">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <form className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button type="submit" size="sm">
                                Subscribe
                            </Button>
                        </form>

                        {/* <h4 className="font-medium text-lg mt-6">Follow Us</h4>
                        <div className="flex space-x-3">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10"
                                asChild
                            >
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10"
                                asChild
                            >
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10"
                                asChild
                            >
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </Button>
                        </div> */}
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {currentYear} Sajilo News. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
