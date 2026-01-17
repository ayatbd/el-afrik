"use client";
import AddQNAModal from "@/components/modules/faq/AddQNAModal";
import { useGetFaqQuery } from "@/redux/api/faqApi";

const FaqPage = () => {
  // get faqs using rtk query
  const { data: faqs, isLoading, isError } = useGetFaqQuery(undefined);
  // console.log(faqs.data.result);
  const faqsData = faqs?.data?.result;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There is an error occurred</div>;
  return (
    <div className="w-full">
      <div className="p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between">
            <h2 className="sm:text-3xl text-2xl font-semibold text-gray-800 mb-12">
              Frequently Asked Questions
            </h2>
            <AddQNAModal />
          </div>
          <div className="space-y-8">
            {faqsData?.map((faq: any) => (
              <div key={faq._id} className="flex items-start">
                <div className="shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Are there any special discounts or early bird offers?
                  </h3>
                  <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">
                    Yes! We offer limited-time early bird discounts and bundle
                    packages for group registrations. Be sure to sign up early
                    to grab the best deals.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

{
  /* <div className="space-y-8">
            <div className="flex items-start">
              <div className="shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">
                  Are there any special discounts or early bird offers?
                </h3>
                <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">
                  Yes! We offer limited-time early bird discounts and bundle
                  packages for group registrations. Be sure to sign up early to
                  grab the best deals.
                </p>
              </div>
            </div> */
}
