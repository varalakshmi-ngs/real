import React, { useEffect, useState } from "react";
import { 
  Input, 
  Button, 
  FormGroup, 
  Card,
  TextArea
} from "../../components/UI";
import { apiRequest } from "../../services/ApiCalls";
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageCircle,
  Share2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { toast } from "react-toastify";

export default function SocialSettings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    youtube: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    email: "",
    phone: "",
    address: "",
    mapLocation: "",
  });

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchSocials = async () => {
    setLoading(true);
    const res = await apiRequest({
      method: "get",
      url: "/social/",
    });
    setLoading(false);

    if (res && res.data) {
      setFormData({
        youtube: res.data.youtube || "",
        whatsapp: res.data.whatsapp || "",
        facebook: res.data.facebook || "",
        instagram: res.data.instagram || "",
        twitter: res.data.twitter || "",
        linkedin: res.data.linkedin || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        mapLocation: res.data.mapLocation || "",
      });
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiRequest({
      method: "put",
      url: "/social/",
      data: formData,
      headers: getHeaders(),
    });
    setLoading(false);
    
    if (res && res.success) {
      fetchSocials();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Centralized Social & Contact Settings</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Configure external social media links and official church contact information. Empty social URLs will automatically hide their icons across the website.
        </p>
      </div>

      {loading && (
        <div className="text-center text-slate-500 font-medium py-2">
          Loading settings...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Share2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">Central Social Media Links</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* YOUTUBE */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-red-50 text-red-600">
                  <Youtube className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="YouTube Link">
                    <Input
                      type="url"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                      placeholder="https://youtube.com/..."
                    />
                  </FormGroup>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-green-50 text-green-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="WhatsApp Link / Phone Number" help="Enter a WhatsApp URL or plain phone number (with country code, e.g. 917399993536)">
                    <Input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 917399993536"
                    />
                  </FormGroup>
                </div>
              </div>

              {/* FACEBOOK */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Facebook Link">
                    <Input
                      type="url"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      placeholder="https://facebook.com/..."
                    />
                  </FormGroup>
                </div>
              </div>

              {/* INSTAGRAM */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-pink-50 text-pink-600">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Instagram Link">
                    <Input
                      type="url"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                    />
                  </FormGroup>
                </div>
              </div>

              {/* TWITTER */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-slate-100 text-slate-800">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="X / Twitter Link">
                    <Input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="https://x.com/..."
                    />
                  </FormGroup>
                </div>
              </div>

              {/* LINKEDIN */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-sky-50 text-sky-600">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="LinkedIn Link">
                    <Input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </FormGroup>
                </div>
              </div>

            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">Official Contact Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Official Email Address">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rgwm.withds@gmail.com"
                    />
                  </FormGroup>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3">
                <div className="mt-9 p-2 rounded-lg bg-teal-50 text-teal-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Official Phone Number">
                    <Input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 73999 93536"
                    />
                  </FormGroup>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-3 md:col-span-2">
                <div className="mt-9 p-2 rounded-lg bg-amber-50 text-amber-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Official Address / Location">
                    <TextArea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. REAL TEMPLE, LB Nagar, Hyderabad, India"
                      rows={3}
                    />
                  </FormGroup>
                </div>
              </div>

              {/* GOOGLE MAP EMBED LOCATION */}
              <div className="flex items-start gap-3 md:col-span-2">
                <div className="mt-9 p-2 rounded-lg bg-red-50 text-red-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <FormGroup label="Google Map Embed Location (Search Query)" help="Specify the place name, coordinates, or search query parameter used to display the dynamic church pin on the Google Map (e.g. Real Temple Church (The Real Church))">
                    <Input
                      type="text"
                      value={formData.mapLocation}
                      onChange={(e) => setFormData({ ...formData, mapLocation: e.target.value })}
                      placeholder="e.g. Real Temple Church (The Real Church)"
                    />
                  </FormGroup>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
