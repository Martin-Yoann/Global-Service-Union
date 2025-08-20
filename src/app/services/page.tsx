import { currentUser } from "@clerk/nextjs/server";
import ManageServicesButton from "../../components/ManageServicesButton";
import ViewServiceButton from "../../components/ViewServiceButton";

export default async function ServicesPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <p className="p-6 text-center text-red-500">
        Please log in to manage your services.
      </p>
    );
  }

  const services = [
    { id: 1, name: "E-cigarette Global Expansion", status: "In Progress" },
    { id: 2, name: "Food Category Global Expansion", status: "Completed" },
    { id: 3, name: "B2B Store Onboarding", status: "Pending" },
    { id: 4, name: "Custom Store Development & Authorization", status: "Pending" },
  ];

  const statusColors: Record<string, string> = {
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-gray-100 text-gray-600",
  };

  return (
    <main className="container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Service Management
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Service Name
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {service.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[service.status]}`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ViewServiceButton serviceName={service.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <ManageServicesButton />
      </div>
    </main>
  );
}
