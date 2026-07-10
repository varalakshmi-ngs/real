import React, { useEffect, useState } from "react";
import { 
  Input, 
  TextArea, 
  Button, 
  Select, 
  FormGroup, 
  Card 
} from "../../../../components/UI";
import { apiRequest } from "../../../../services/ApiCalls";
import { 
  FileText, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Heart, 
  Building2,
  DollarSign,
  LayoutGrid
} from "lucide-react";
import { APIURL } from "../../../../Core/url";
import { toast } from "react-toastify";

export default function ContributionEditor() {
  const [data, setData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("hero");
  const [loading, setLoading] = useState(false);

  // Form states
  const [heroForm, setHeroForm] = useState({
    heroHeadingLine1: "",
    heroHeadingHighlight: "",
    heroDescription: "",
    heroButtonGiveNow: "",
    heroButtonLearnMore: "",
  });

  const [servingForm, setServingForm] = useState({
    servingHeading: "",
    servingDescription: "",
  });
  const [servingImageFile, setServingImageFile] = useState(null);
  const [servingImagePreview, setServingImagePreview] = useState(null);

  const [supportForm, setSupportForm] = useState({
    title: "",
    description: "",
  });
  const [supportImageFile, setSupportImageFile] = useState(null);
  const [supportImagePreview, setSupportImagePreview] = useState(null);

  const [waysForm, setWaysForm] = useState({
    waysLabel: "",
    waysHeading: "",
  });
  const [newAmount, setNewAmount] = useState("");
  const [newPurpose, setNewPurpose] = useState({ name: "", value: "" });

  const [formSideForm, setFormSideForm] = useState({
    formLabel: "",
    formHeading: "",
    formDescription: "",
  });
  const [formSideImageFile, setFormSideImageFile] = useState(null);
  const [formSideImagePreview, setFormSideImagePreview] = useState(null);

  const [bankForm, setBankForm] = useState({
    bankAccountName: "",
    bankAccountNumber: "",
    bankIfsc: "",
    bankBranch: "",
  });

  const sections = [
    { value: "hero", label: "Hero Section" },
    { value: "serving", label: "Serving with Love" },
    { value: "support", label: "Why Your Support Matters" },
    { value: "ways", label: "Ways to Give & Options" },
    { value: "formSide", label: "Donation Form Content" },
    { value: "bank", label: "Bank Details" },
  ];

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("/") || img.startsWith("http")) return img;
    return `${APIURL}/${img}`;
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await apiRequest({
      method: "get",
      url: "/contribution/",
    });
    setLoading(false);

    if (res && res.data) {
      const d = res.data;
      setData(d);
      
      setHeroForm({
        heroHeadingLine1: d.heroHeadingLine1 || "",
        heroHeadingHighlight: d.heroHeadingHighlight || "",
        heroDescription: d.heroDescription || "",
        heroButtonGiveNow: d.heroButtonGiveNow || "",
        heroButtonLearnMore: d.heroButtonLearnMore || "",
      });

      setServingForm({
        servingHeading: d.servingHeading || "",
        servingDescription: d.servingDescription || "",
      });
      setServingImagePreview(getImageUrl(d.servingImage));

      setSupportImagePreview(getImageUrl(d.supportImage));

      setWaysForm({
        waysLabel: d.waysLabel || "",
        waysHeading: d.waysHeading || "",
      });

      setFormSideForm({
        formLabel: d.formLabel || "",
        formHeading: d.formHeading || "",
        formDescription: d.formDescription || "",
      });
      setFormSideImagePreview(getImageUrl(d.formImage));

      setBankForm({
        bankAccountName: d.bankAccountName || "",
        bankAccountNumber: d.bankAccountNumber || "",
        bankIfsc: d.bankIfsc || "",
        bankBranch: d.bankBranch || "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiRequest({
      method: "put",
      url: "/contribution/hero",
      data: heroForm,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  const handleServingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("servingHeading", servingForm.servingHeading);
    fd.append("servingDescription", servingForm.servingDescription);
    if (servingImageFile) {
      fd.append("image", servingImageFile);
    }

    const res = await apiRequest({
      method: "put",
      url: "/contribution/serving",
      data: fd,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setServingImageFile(null);
      fetchData();
    }
  };

  const handleSupportImageSubmit = async (e) => {
    e.preventDefault();
    if (!supportImageFile) {
      toast.warning("Please select an image first");
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append("image", supportImageFile);

    const res = await apiRequest({
      method: "put",
      url: "/contribution/support-image",
      data: fd,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setSupportImageFile(null);
      fetchData();
    }
  };

  const handleAddSupportItem = async (e) => {
    e.preventDefault();
    if (!supportForm.title || !supportForm.description) {
      toast.warning("Please fill title and description");
      return;
    }
    setLoading(true);
    const res = await apiRequest({
      method: "post",
      url: "/contribution/support-item",
      data: supportForm,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setSupportForm({ title: "", description: "" });
      fetchData();
    }
  };

  const handleDeleteSupportItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    const res = await apiRequest({
      method: "delete",
      url: `/contribution/support-item/${id}`,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  const handleWaysSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiRequest({
      method: "put",
      url: "/contribution/ways",
      data: waysForm,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  const handleAddAmount = async (e) => {
    e.preventDefault();
    if (!newAmount || isNaN(newAmount)) {
      toast.warning("Please enter a valid amount");
      return;
    }
    setLoading(true);
    const res = await apiRequest({
      method: "post",
      url: "/contribution/amount",
      data: { amount: newAmount },
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setNewAmount("");
      fetchData();
    }
  };

  const handleDeleteAmount = async (id) => {
    setLoading(true);
    const res = await apiRequest({
      method: "delete",
      url: `/contribution/amount/${id}`,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  const handleAddPurpose = async (e) => {
    e.preventDefault();
    if (!newPurpose.name || !newPurpose.value) {
      toast.warning("Please fill purpose label and select value");
      return;
    }
    setLoading(true);
    const res = await apiRequest({
      method: "post",
      url: "/contribution/purpose",
      data: newPurpose,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setNewPurpose({ name: "", value: "" });
      fetchData();
    }
  };

  const handleDeletePurpose = async (id) => {
    setLoading(true);
    const res = await apiRequest({
      method: "delete",
      url: `/contribution/purpose/${id}`,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  const handleFormSideSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("formLabel", formSideForm.formLabel);
    fd.append("formHeading", formSideForm.formHeading);
    fd.append("formDescription", formSideForm.formDescription);
    if (formSideImageFile) {
      fd.append("image", formSideImageFile);
    }

    const res = await apiRequest({
      method: "put",
      url: "/contribution/form-side",
      data: fd,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      setFormSideImageFile(null);
      fetchData();
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiRequest({
      method: "put",
      url: "/contribution/bank",
      data: bankForm,
      headers: getHeaders(),
    });
    setLoading(false);
    if (res && res.success) {
      fetchData();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl">
      {/* Dropdown Section Chooser */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Contribution Page Editor</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Select a section below to configure text fields, donation parameters, and banner graphics.</p>
          </div>
          <div className="w-full max-w-sm">
            <Select
              options={sections}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              placeholder="Choose a section to edit"
              className="bg-white"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6 text-slate-500 font-medium">
          Saving / loading content...
        </div>
      )}

      {/* Hero Section Edit Form */}
      {selectedSection === "hero" && (
        <form onSubmit={handleHeroSubmit} className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">Hero Section Details</h3>
            </div>
            
            <FormGroup label="Main Heading Line 1" required>
              <Input
                type="text"
                value={heroForm.heroHeadingLine1}
                onChange={(e) => setHeroForm({ ...heroForm, heroHeadingLine1: e.target.value })}
                placeholder="Every contribution matters,"
              />
            </FormGroup>

            <FormGroup label="Highlighted Heading Line 2" required>
              <Input
                type="text"
                value={heroForm.heroHeadingHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, heroHeadingHighlight: e.target.value })}
                placeholder="every act of giving transforms lives."
              />
            </FormGroup>

            <FormGroup label="Hero Description" required>
              <TextArea
                rows={3}
                value={heroForm.heroDescription}
                onChange={(e) => setHeroForm({ ...heroForm, heroDescription: e.target.value })}
                placeholder="Enter description..."
              />
            </FormGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Give Now Button Text" required>
                <Input
                  type="text"
                  value={heroForm.heroButtonGiveNow}
                  onChange={(e) => setHeroForm({ ...heroForm, heroButtonGiveNow: e.target.value })}
                  placeholder="Give Now"
                />
              </FormGroup>
              <FormGroup label="Learn More Button Text" required>
                <Input
                  type="text"
                  value={heroForm.heroButtonLearnMore}
                  onChange={(e) => setHeroForm({ ...heroForm, heroButtonLearnMore: e.target.value })}
                  placeholder="Learn More"
                />
              </FormGroup>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2">
                Update Hero Section
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* Serving with Love Section Edit Form */}
      {selectedSection === "serving" && (
        <form onSubmit={handleServingSubmit} className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-slate-800">Serving with Love Details</h3>
            </div>

            <FormGroup label="Section Heading" required>
              <Input
                type="text"
                value={servingForm.servingHeading}
                onChange={(e) => setServingForm({ ...servingForm, servingHeading: e.target.value })}
                placeholder="Serving with Love"
              />
            </FormGroup>

            <FormGroup label="Section Description" required>
              <TextArea
                rows={3}
                value={servingForm.servingDescription}
                onChange={(e) => setServingForm({ ...servingForm, servingDescription: e.target.value })}
                placeholder="Enter description..."
              />
            </FormGroup>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Section Image</label>
              {servingImagePreview && (
                <div className="relative w-full max-w-lg h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={servingImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="serving-file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setServingImageFile(file);
                      setServingImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("serving-file").click()}
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold rounded-xl flex items-center gap-2 px-4 py-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Choose New Image
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2">
                Update Serving Details
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* Why Your Support Matters Section Edit Form */}
      {selectedSection === "support" && (
        <div className="space-y-6">
          {/* Section Image Banner */}
          <form onSubmit={handleSupportImageSubmit}>
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-800">Support Banner Image (Right Side)</h3>
              </div>
              
              {supportImagePreview && (
                <div className="relative w-full max-w-lg h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={supportImagePreview}
                    alt="Support Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="support-file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSupportImageFile(file);
                      setSupportImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("support-file").click()}
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold rounded-xl flex items-center gap-2 px-4 py-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Choose Banner Image
                </Button>
                
                {supportImageFile && (
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2">
                    Save Banner Image
                  </Button>
                )}
              </div>
            </Card>
          </form>

          {/* Manage Support Cards */}
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <LayoutGrid className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">Support Items List</h3>
            </div>

            {/* List of current items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.supportItems?.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSupportItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 shrink-0 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Item form */}
            <form onSubmit={handleAddSupportItem} className="border-t border-slate-100 pt-6 space-y-4">
              <h4 className="font-bold text-slate-700">Add New Support Item</h4>
              <FormGroup label="Item Title" required>
                <Input
                  type="text"
                  value={supportForm.title}
                  onChange={(e) => setSupportForm({ ...supportForm, title: e.target.value })}
                  placeholder="e.g. Community Outreach"
                />
              </FormGroup>
              <FormGroup label="Item Description" required>
                <TextArea
                  rows={2}
                  value={supportForm.description}
                  onChange={(e) => setSupportForm({ ...supportForm, description: e.target.value })}
                  placeholder="Enter details..."
                />
              </FormGroup>
              <div className="flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center gap-1.5 px-5 py-2">
                  <Plus className="w-4 h-4" />
                  Add Support Card
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Ways to Give section & option arrays edit form */}
      {selectedSection === "ways" && (
        <div className="space-y-6">
          {/* Header titles */}
          <form onSubmit={handleWaysSubmit}>
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <FileText className="w-5 h-5 text-pink-600" />
                <h3 className="text-lg font-bold text-slate-800">Ways to Give Titles</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup label="Section Subheading / Label">
                  <Input
                    type="text"
                    value={waysForm.waysLabel}
                    onChange={(e) => setWaysForm({ ...waysForm, waysLabel: e.target.value })}
                    placeholder="Support With Love"
                  />
                </FormGroup>
                <FormGroup label="Section Heading">
                  <Input
                    type="text"
                    value={waysForm.waysHeading}
                    onChange={(e) => setWaysForm({ ...waysForm, waysHeading: e.target.value })}
                    placeholder="Ways to Give"
                  />
                </FormGroup>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2">
                  Update Ways Header
                </Button>
              </div>
            </Card>
          </form>

          {/* Amount presets list & manager */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-slate-800">Donation Amount Presets</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {data?.donationAmounts?.map((opt) => (
                  <span key={opt.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm">
                    ₹{opt.amount}
                    <button
                      type="button"
                      onClick={() => handleDeleteAmount(opt.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddAmount} className="flex gap-2 items-end pt-3">
                <div className="flex-1">
                  <FormGroup label="New Amount Preset">
                    <Input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="e.g. 1000"
                    />
                  </FormGroup>
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl h-11 px-4 flex items-center justify-center shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </form>
            </Card>

            {/* Purposes options list & manager */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <LayoutGrid className="w-5 h-5 text-sky-600" />
                <h4 className="font-bold text-slate-800">Donation Purposes</h4>
              </div>

              <div className="space-y-2">
                {data?.donationPurposes?.map((p) => (
                  <div key={p.id} className="flex justify-between items-center bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm">
                    <div>
                      <span className="font-semibold text-slate-800">{p.name}</span>
                      <span className="text-slate-500 ml-2 text-xs">({p.value})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePurpose(p.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddPurpose} className="space-y-3 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormGroup label="Label">
                    <Input
                      type="text"
                      value={newPurpose.name}
                      onChange={(e) => setNewPurpose({ ...newPurpose, name: e.target.value })}
                      placeholder="e.g. Community Outreach"
                    />
                  </FormGroup>
                  <FormGroup label="Value">
                    <Input
                      type="text"
                      value={newPurpose.value}
                      onChange={(e) => setNewPurpose({ ...newPurpose, value: e.target.value })}
                      placeholder="e.g. community-outreach"
                    />
                  </FormGroup>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-2 flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Purpose
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* Donation Form Side content form */}
      {selectedSection === "formSide" && (
        <form onSubmit={handleFormSideSubmit} className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <FileText className="w-5 h-5 text-cyan-600" />
              <h3 className="text-lg font-bold text-slate-800">Form Side Details</h3>
            </div>

            <FormGroup label="Small Label / Header Tag" required>
              <Input
                type="text"
                value={formSideForm.formLabel}
                onChange={(e) => setFormSideForm({ ...formSideForm, formLabel: e.target.value })}
                placeholder="Real Temple Church"
              />
            </FormGroup>

            <FormGroup label="Heading" required>
              <Input
                type="text"
                value={formSideForm.formHeading}
                onChange={(e) => setFormSideForm({ ...formSideForm, formHeading: e.target.value })}
                placeholder="Every Gift Changes Lives"
              />
            </FormGroup>

            <FormGroup label="Description" required>
              <TextArea
                rows={3}
                value={formSideForm.formDescription}
                onChange={(e) => setFormSideForm({ ...formSideForm, formDescription: e.target.value })}
                placeholder="Enter description..."
              />
            </FormGroup>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Side Image</label>
              {formSideImagePreview && (
                <div className="relative w-full max-w-lg h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={formSideImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="formside-file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormSideImageFile(file);
                      setFormSideImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("formside-file").click()}
                  className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold rounded-xl flex items-center gap-2 px-4 py-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Choose Side Image
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2">
                Update Side Content
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* Bank details form */}
      {selectedSection === "bank" && (
        <form onSubmit={handleBankSubmit} className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-slate-850">Bank Transfer Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup label="Account Holder Name" required>
                <Input
                  type="text"
                  value={bankForm.bankAccountName}
                  onChange={(e) => setBankForm({ ...bankForm, bankAccountName: e.target.value })}
                  placeholder="D. SURESH"
                />
              </FormGroup>

              <FormGroup label="Account Number" required>
                <Input
                  type="text"
                  value={bankForm.bankAccountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, bankAccountNumber: e.target.value })}
                  placeholder="50100286369360"
                />
              </FormGroup>

              <FormGroup label="IFSC Code" required>
                <Input
                  type="text"
                  value={bankForm.bankIfsc}
                  onChange={(e) => setBankForm({ ...bankForm, bankIfsc: e.target.value })}
                  placeholder="HDFC0001990"
                />
              </FormGroup>

              <FormGroup label="Branch Name" required>
                <Input
                  type="text"
                  value={bankForm.bankBranch}
                  onChange={(e) => setBankForm({ ...bankForm, bankBranch: e.target.value })}
                  placeholder="HAYATNAGAR"
                />
              </FormGroup>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2">
                Update Bank Details
              </Button>
            </div>
          </Card>
        </form>
      )}
    </div>
  );
}
