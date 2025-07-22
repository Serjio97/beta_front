import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            These terms govern your use of our services and establish the agreement between you and our company.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By using our services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Services</h2>
            <p className="text-gray-600 mb-6">
              We provide professional services including consulting, programs, and solutions 
              tailored to meet your business needs. Our services are delivered through 
              various channels including in-person consultations, digital platforms, and 
              project-based engagements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Agreements</h2>
            <p className="text-gray-600 mb-6">
              Specific terms for each service will be outlined in separate service agreements 
              or statements of work. These documents will detail scope, deliverables, timelines, 
              and payment terms for the specific services requested.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-gray-600 mb-6">
              Payment terms vary by service and will be specified in your service agreement. 
              Generally, payment is due according to the schedule outlined in your agreement. 
              Late payments may result in service suspension or termination.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              All content, materials, and deliverables created specifically for you remain your property. 
              Our proprietary methodologies, tools, and general knowledge remain our intellectual property. 
              Specific ownership terms will be detailed in your service agreement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality</h2>
            <p className="text-gray-600 mb-6">
              We respect the confidentiality of your business information and maintain strict 
              confidentiality protocols. We will not disclose your confidential information 
              to third parties without your consent, except as required by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              Our liability is limited to the fees paid for the specific service. We are not 
              liable for indirect, incidental, or consequential damages. This limitation applies 
              to the fullest extent permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600 mb-6">
              Either party may terminate services according to the terms specified in the service agreement. 
              Upon termination, you remain responsible for payment of services rendered up to the termination date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms are governed by the laws of the jurisdiction in which our company operates. 
              Any disputes will be resolved through binding arbitration or in the courts of that jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We may update these terms from time to time. Updated terms will be posted on our website 
              and will take effect immediately upon posting. Continued use of our services constitutes 
              acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about these terms, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">
                Email: legal@company.com<br/>
                Phone: (555) 123-4567<br/>
                Address: 123 Main Street, City, State 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;