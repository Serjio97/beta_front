import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cookie, Shield, BarChart3, Target, Settings, Info } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookiePolicy = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      if (savedPreferences.analytics) {
        loadGoogleAnalytics();
        loadHubspot();
      }
    }
  }, []);

  const loadGoogleAnalytics = () => {
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ✅ Replace with your ID
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    (window as any).gtag = (window as any).gtag || function () {
      ((window as any).gtag.q = (window as any).gtag.q || []).push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', GA_MEASUREMENT_ID);
  };

  const loadHubspot = () => {
    const script = document.createElement('script');
    script.src = 'https://js.hs-scripts.com/your-hubspot-id.js'; // ✅ Replace with your HubSpot ID
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences));

    if (key === 'analytics' && value) {
      loadGoogleAnalytics();
      loadHubspot();
    }
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cookies cannot be disabled as they are required for basic website operations.',
      icon: Shield,
      required: true,
      examples: ['Session management', 'Security tokens', 'Cookie consent preferences'],
      duration: 'Session / 1 year'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      icon: BarChart3,
      required: false,
      examples: ['Google Analytics', 'Page views', 'User behavior tracking'],
      duration: '2 years',
      thirdParty: 'Google LLC'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.',
      icon: Target,
      required: false,
      examples: ['Ad targeting', 'Conversion tracking', 'Remarketing'],
      duration: '1 year',
      thirdParty: 'Various advertising partners'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Cookie className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold text-primary">Cookie Policy</CardTitle>
            </div>
            <CardDescription className="text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                You can manage your cookie preferences at any time using the controls below.
                Changes will be applied immediately and saved to your browser.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Manage Your Cookie Preferences
              </h2>
              <div className="grid gap-6">
                {cookieTypes.map((cookie) => (
                  <Card key={cookie.id} className="border-2">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <cookie.icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{cookie.name}</CardTitle>
                          {cookie.required && <Badge variant="secondary">Required</Badge>}
                        </div>
                        <Switch
                          checked={preferences[cookie.id as keyof CookiePreferences]}
                          onCheckedChange={(value) =>
                            handlePreferenceChange(cookie.id as keyof CookiePreferences, value)
                          }
                          disabled={cookie.required}
                        />
                      </div>
                      <CardDescription className="text-sm">
                        {cookie.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Examples:</Label>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            {cookie.examples.map((example, index) => (
                              <li key={index}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Label className="font-medium">Duration:</Label>
                          <p className="mt-1 text-muted-foreground">{cookie.duration}</p>
                        </div>
                        {cookie.thirdParty && (
                          <div>
                            <Label className="font-medium">Third Party:</Label>
                            <p className="mt-1 text-muted-foreground">{cookie.thirdParty}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Remaining sections unchanged */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files placed on your device to improve your experience and help us deliver better services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To ensure our website functions properly and securely</li>
                <li>To remember your cookie preferences and settings</li>
                <li>To analyze website usage and improve performance</li>
                <li>To support marketing and advertising efforts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Third-Party Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Google Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Google Analytics helps us understand user behavior anonymously. Data is aggregated and does not personally identify you.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Learn more:{" "}
                    <a
                      href="https://policies.google.com/technologies/cookies"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Cookie Policy
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">HubSpot</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use HubSpot to manage customer relationships and marketing automation. HubSpot cookies help track conversions and personalize content.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Learn more:{" "}
                    <a
                      href="https://legal.hubspot.com/cookie-policy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      HubSpot Cookie Policy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Browser Settings</h2>
              <p className="text-muted-foreground">
                You can manage cookies in your browser settings. Disabling all cookies may affect your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Updates</h2>
              <p className="text-muted-foreground">
                This Cookie Policy may be updated occasionally. Please check back regularly for changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about our Cookie Policy, contact us through our contact page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
