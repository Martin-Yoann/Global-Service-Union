"use client";

import { useState } from "react";

export default function JoinUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.organization.trim())
      newErrors.organization = "Organization is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 模拟提交
      setSuccess(true);
      setForm({ name: "", email: "", organization: "", message: "" });
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Submission failed, please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const partners = [
    "/partner1.png",
    "/partner2.png",
    "/partner3.png",
    "/partner4.png",
    "/partner5.png",
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-12 text-center tracking-tight">
        Join Global Service Union
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left - Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-200"
        >
          <p className="text-gray-700 mb-4 text-lg">
            Fill out the form to become part of our alliance.
          </p>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-semibold mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              disabled={submitting}
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              type="email"
              disabled={submitting}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block font-semibold mb-2">
              Organization <span className="text-red-500">*</span>
            </label>
            <input
              id="organization"
              name="organization"
              value={form.organization}
              onChange={onChange}
              className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.organization
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              disabled={submitting}
              placeholder="Your company or organization"
            />
            {errors.organization && (
              <p className="text-red-600 text-sm mt-1">{errors.organization}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-semibold mb-2">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              disabled={submitting}
              placeholder="Additional info or questions"
            ></textarea>
          </div>

          {/* Submit Errors & Success */}
          {errors.submit && (
            <p className="text-red-600 text-center font-medium">
              {errors.submit}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-center font-semibold">
              Thank you for joining us!
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            {submitting ? "Submitting..." : "Join Now"}
          </button>
        </form>

        {/* Right - Contact Info */}
        <aside className="bg-gray-50 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
            Contact Information
          </h2>
          <ul className="space-y-8 text-gray-700 text-base leading-relaxed">
            <li className="flex items-start gap-4">
              <span className="text-3xl">
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4466"
                  width="20"
                  height="20"
                >
                  <path
                    d="M541.190891 1009.293248C544.52832 1005.885275 548.383707 1001.898704 552.713978 997.36109 565.025302 984.460186 578.71838 969.688892 593.450024 953.266626 635.514509 906.374618 677.575463 855.548152 716.899743 802.505285 772.694379 727.246301 818.336558 653.733231 850.310552 583.915306 882.791737 512.990107 900.380982 447.547911 900.380982 388.380982 900.380982 173.884097 726.496814 0 512 0 297.503186 0 123.619018 173.884097 123.619018 388.380982 123.619018 453.914994 148.112442 529.89656 192.638909 615.024269 222.801105 672.689965 261.563999 733.327147 306.917011 795.635831 346.163792 849.555204 388.144069 901.753449 430.125229 950.301866 444.824743 967.300737 458.485691 982.641645 470.765062 996.079009 475.081033 1000.802039 478.922121 1004.956003 482.24525 1008.510078 484.268362 1010.673642 485.687365 1012.175194 486.459184 1012.983838 500.133902 1027.31116 522.916683 1027.589594 536.93759 1013.600746 537.722472 1012.817576 539.154539 1011.372534 541.190891 1009.293248ZM537.540816 964.228432C536.933529 963.592087 535.680295 962.265819 533.824363 960.28098 530.682538 956.921044 527.024342 952.964783 522.892674 948.443587 511.036286 935.468873 497.80291 920.608075 483.539265 904.113199 442.768795 856.965196 401.997442 806.270003 364.009369 754.079684 320.553597 694.377636 283.599147 636.569422 255.210969 582.295634 215.493894 506.362491 194.233742 440.41104 194.233742 388.380982 194.233742 212.883532 336.502462 70.614724 512 70.614724 687.497538 70.614724 829.766258 212.883532 829.766258 388.380982 829.766258 436.039636 814.709257 492.060238 786.108175 554.512959 756.432867 619.311431 713.270146 688.831132 660.173876 760.450492 622.263303 811.586462 581.572627 860.7571 540.885482 906.113538 526.654144 921.978212 513.452721 936.219066 501.628286 948.609655 497.511094 952.924056 493.867022 956.692128 490.739495 959.885697 488.896804 961.767332 487.65681 963.018643 487.06241 963.611524L537.540816 964.228432ZM670.883129 388.380982C670.883129 300.632248 599.748681 229.497853 512 229.497853 424.251319 229.497853 353.116871 300.632248 353.116871 388.380982 353.116871 476.129715 424.251319 547.26411 512 547.26411 599.748681 547.26411 670.883129 476.129715 670.883129 388.380982ZM423.731595 388.380982C423.731595 339.631683 463.250772 300.112577 512 300.112577 560.749228 300.112577 600.268405 339.631683 600.268405 388.380982 600.268405 437.13028 560.749228 476.649387 512 476.649387 463.250772 476.649387 423.731595 437.13028 423.731595 388.380982Z"
                    fill="#389BFF"
                    p-id="4467"
                  ></path>
                </svg>
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Headquarters</p>
                890 Innovation Drive, Suite 210
                <br />
                Silicon Valley, CA 94043, USA
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl">
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8249"
                  data-spm-anchor-id="a313x.search_index.0.i20.29f93a81OQo6o7"
                  width="20"
                  height="20"
                >
                  <path
                    d="M731.7 451.9c0 21.9 14.6 35.4 35.4 35.4 21.9 0 35.4-14.6 35.4-35.4-0.5-118.7-96.3-214.6-215.1-215.1-21.9 0-35.4 14.6-35.4 35.4 0 21.9 14.6 35.4 35.4 35.4 79.7 0.5 143.8 64.6 144.3 144.3z m143.2 0c0 21.9 14.6 35.4 35.4 35.4s35.4-14.6 35.4-35.4c0-197.4-162-358.3-358.3-358.3-21.9 0-35.4 14.6-35.4 35.4s14.6 35.4 35.4 35.4c158.3 0 287.5 129.7 287.5 287.5zM390.6 326.4c39.6-39.6 42.7-100.5 7.3-143.2l-111-140.7C251.5-4.3 182.8-11.6 136.4 24.8c-3.1 3.1-7.3 3.1-7.3 7.3L31.8 129C-60.9 221.7 71.4 473.2 312 713.8s488 369.7 581.2 279.7l96.9-96.9c42.7-42.7 42.7-110.9 0-150.5l-7.3-7.3-140.2-110.9c-42.7-35.4-103.6-32.3-143.2 7.3l-60.9 60.9c-64.6-39.6-122.4-82.3-172.4-132.8-50-50.5-92.7-107.8-132.3-172.4-1-0.5 56.8-64.5 56.8-64.5zM340.1 229c10.4 14.6 10.4 35.4-3.1 46.9l-79.2 82.8c-11.5 11.5-14.1 28.6-7.3 42.7 42.2 78.1 95.8 148.9 157.8 212 62.5 62.5 133.8 115.6 212 157.8 14.6 6.8 31.8 4.2 42.7-7.3l82.3-82.3c14.6-14.6 32.3-14.6 46.9-3.1l140.1 115.1s3.1 0 3.1 3.1c14.1 13 14.6 34.9 1.6 49l-1.6 1.6-97 96.7c-46.9 46.9-268.7-71.9-480.7-279.7C146.8 455 31.8 229 78.6 182.1L179.1 81.6c14.6-10.4 39.6-10.4 50 7.3l111 140.1z"
                    fill="#1492e8"
                    p-id="8250"
                  ></path>
                </svg>
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Phone</p>
                <a
                  href="tel:+18001234567"
                  className="text-indigo-600 hover:underline transition"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl">
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2388"
                  width="20"
                  height="20"
                >
                  <path
                    d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z"
                    fill="#1492e8"
                    p-id="2389"
                  ></path>
                </svg>
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Email</p>
                <a
                  href="mailto:support@globalsu.org"
                  className="text-indigo-600 hover:underline transition"
                >
                  support@globalsu.org
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl">
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="10431"
                  width="20"
                  height="20"
                >
                  <path
                    d="M927.616 465.6C923.328 236.704 745.888 51.808 528 51.808h-32c-217.888 0-395.328 184.896-399.616 413.76C58.112 487.744 32 528.672 32 576v64c0 70.592 57.408 128 128 128s128-57.408 128-128v-64a128.064 128.064 0 0 0-126.784-127.872C173.728 262.688 318.912 115.808 496 115.808h32c177.12 0 322.272 146.88 334.784 332.32A128.064 128.064 0 0 0 736 576v64c0 57.792 38.72 106.176 91.392 122.016a337.504 337.504 0 0 1-191.936 124.48A79.712 79.712 0 0 0 560 832a80 80 0 1 0 0 160 79.68 79.68 0 0 0 67.872-38.112 402.432 402.432 0 0 0 278.24-193.6C955.968 742.816 992 695.776 992 640v-64c0-47.328-26.112-88.256-64.384-110.4zM224 576v64c0 35.296-28.704 64-64 64s-64-28.704-64-64v-64c0-35.296 28.704-64 64-64s64 28.704 64 64z m704 64c0 34.304-27.2 62.176-61.12 63.712l-2.496-1.184c-0.224 0.512-0.576 0.928-0.8 1.408A64 64 0 0 1 800 640v-64c0-35.296 28.704-64 64-64s64 28.704 64 64v64z"
                    p-id="10432"
                    fill="#1492e8"
                  ></path>
                </svg>
              </span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Service Hours
                </p>
                Monday – Friday:{" "}
                <span className="text-gray-600">09:00 AM – 06:00 PM</span>
                <br />
                Saturday:{" "}
                <span className="text-gray-600">10:00 AM – 02:00 PM</span>
                <br />
                Sunday: <span className="text-gray-500 italic">Closed</span>
              </div>
            </li>
          </ul>
        </aside>
      </div>

      {/* 合作伙伴版块 */}
      <section className="mt-20 bg-indigo-50 rounded-xl p-10 shadow-inner border border-indigo-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          Our Trusted Partners
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-5 gap-12 items-center">
          {partners.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt={`Partner ${i + 1}`}
              className="max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
              draggable={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
