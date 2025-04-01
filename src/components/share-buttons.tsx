'use client';

import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
} from 'react-share';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
    console.log('fullUrl', fullUrl);
    return (
        <div className="flex items-center gap-2">
            <FacebookShareButton url={fullUrl} title={title}>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10"
                >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Share on Facebook</span>
                </Button>
            </FacebookShareButton>

            <TwitterShareButton url={fullUrl} title={title}>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10"
                >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Share on Twitter</span>
                </Button>
            </TwitterShareButton>

            <LinkedinShareButton url={fullUrl} title={title}>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10"
                >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">Share on LinkedIn</span>
                </Button>
            </LinkedinShareButton>
        </div>
    );
};

export default ShareButtons;
