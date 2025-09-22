import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Construction className="w-10 h-10 text-brand-green" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                  <p className="text-lg text-gray-600 mb-8">{description}</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-500">
                    This page is currently under development. All the content for this section 
                    is available on our main homepage with comprehensive details about our services.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => window.history.back()}
                      variant="outline"
                      className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Go Back
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/#home'}
                      className="bg-brand-green hover:bg-brand-green-dark"
                    >
                      View Homepage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
