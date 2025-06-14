
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, X, Mail, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reference {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  testimonial: string;
}

interface ReferencesSectionProps {
  references: Reference[];
  setReferences: (references: Reference[]) => void;
}

const ReferencesSection = ({ references, setReferences }: ReferencesSectionProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newReference, setNewReference] = useState<Reference>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
    testimonial: ""
  });

  const addReference = () => {
    if (newReference.name && newReference.title && newReference.company) {
      setReferences([...references, newReference]);
      setNewReference({
        name: "",
        title: "",
        company: "",
        email: "",
        phone: "",
        relationship: "",
        testimonial: ""
      });
      setIsAdding(false);
      toast({
        title: "Reference Added!",
        description: "Your reference has been added to your presentation.",
      });
    }
  };

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
    toast({
      title: "Reference Removed",
      description: "The reference has been removed from your presentation.",
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users size={24} className="text-green-600" />
          Professional References
        </CardTitle>
        <CardDescription className="text-lg">
          Add professional references who can vouch for your skills and work ethic. Quality references can significantly boost your credibility.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current References */}
        {references.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your References</h3>
            {references.map((reference, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{reference.name}</h4>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">{reference.title}</span>
                      {reference.company && <span> at {reference.company}</span>}
                    </p>
                    {reference.relationship && (
                      <p className="text-sm text-blue-600 font-medium">
                        Relationship: {reference.relationship}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReference(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  {reference.email && (
                    <div className="flex items-center gap-1">
                      <Mail size={14} />
                      <span>{reference.email}</span>
                    </div>
                  )}
                  {reference.phone && (
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      <span>{reference.phone}</span>
                    </div>
                  )}
                  {reference.company && (
                    <div className="flex items-center gap-1">
                      <Building size={14} />
                      <span>{reference.company}</span>
                    </div>
                  )}
                </div>
                
                {reference.testimonial && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-700 italic">"{reference.testimonial}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add New Reference */}
        {!isAdding ? (
          <Button 
            onClick={() => setIsAdding(true)} 
            className="w-full h-16 text-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
            variant="ghost"
          >
            <Plus size={24} className="mr-2" />
            Add Reference
          </Button>
        ) : (
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-4 text-green-900">Add New Reference</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    placeholder="e.g., John Smith"
                    value={newReference.name}
                    onChange={(e) => setNewReference({...newReference, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title *</label>
                  <Input
                    placeholder="e.g., Senior Manager"
                    value={newReference.title}
                    onChange={(e) => setNewReference({...newReference, title: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company *</label>
                  <Input
                    placeholder="e.g., ABC Corporation"
                    value={newReference.company}
                    onChange={(e) => setNewReference({...newReference, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Relationship</label>
                  <Input
                    placeholder="e.g., Direct Supervisor"
                    value={newReference.relationship}
                    onChange={(e) => setNewReference({...newReference, relationship: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="john.smith@company.com"
                    value={newReference.email}
                    onChange={(e) => setNewReference({...newReference, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={newReference.phone}
                    onChange={(e) => setNewReference({...newReference, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Testimonial (Optional)</label>
                <Textarea
                  placeholder="A brief testimonial or quote from this reference about your work..."
                  value={newReference.testimonial}
                  onChange={(e) => setNewReference({...newReference, testimonial: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={addReference} disabled={!newReference.name || !newReference.title || !newReference.company}>
                  Add Reference
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reference Tips */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-bold mb-3 text-green-900">👥 Reference Best Practices:</h4>
          <ul className="text-sm text-green-800 space-y-2">
            <li>• Always ask permission before listing someone as a reference</li>
            <li>• Choose references who can speak to different aspects of your work</li>
            <li>• Include a mix of supervisors, colleagues, and clients when possible</li>
            <li>• Keep your references informed about the positions you're applying for</li>
            <li>• Provide current contact information and verify it regularly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferencesSection;
