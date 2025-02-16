
import Navbar from "@/components/navbar" 
import { auth } from "@/auth";

 
const Pricing = async () => {
  const session = await auth();
  

  const plans = [
    {
      name: "Basic",
      price: "$9/mo",
      features: [
        "Upload up to 10 PDFs",
        "Basic AI Chat Responses",
        "Standard Support",
      ],
    },
    {
      name: "Pro",
      price: "$19/mo",
      features: [
        "Upload Unlimited PDFs",
        "Advanced AI Chat Responses",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "Unlimited PDFs & Users",
        "Dedicated AI Model",
        "24/7 Support & API Access",
      ],
    },
  ];

  return (
    <>
    <Navbar session={session} />
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-700 mb-8">
          Find the perfect plan for your document chat experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border border-blue-300 flex flex-col justify-between"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-xl font-bold text-blue-600 mt-2">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg">
                {plan.name === "Enterprise" ? "Contact Us" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Pricing;
