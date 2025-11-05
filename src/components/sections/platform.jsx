import { useState } from "react";
import { Link } from "react-router-dom";

import JobPortalIcon from "../../assets/platform/JobPortal.png";
import InternshipIcon from "../../assets/platform/internship.png";
import VideoIcon from "../../assets/platform/video.png";
import EduLoansIcon from "../../assets/platform/Eduloans.png";
import QAIcon from "../../assets/platform/Q&A.png";
import UniversityIcon from "../../assets/platform/university.png";
import PostAdmissionIcon from "../../assets/platform/postadmission.png";
import ResumeIcon from "../../assets/platform/resume.png";
import OnlineEduIcon from "../../assets/platform/onlineedu.png";
import FinderIcon from "../../assets/platform/finder.png";
import ReferIcon from "../../assets/platform/refer.png";
import CommunityIcon from "../../assets/platform/community.png";
import SubsidyIcon from "../../assets/platform/subsidy.png";
import ROIIcon from "../../assets/platform/ROI.png";

const Platform = () => {
  const content = [
    {
      id: 1,
      name: "Job Portal",
      icon: JobPortalIcon,
      route: "/Marketplace",
    },
    {
      id: 2,
      name: "Internship Portal",
      icon: InternshipIcon,
      route: "/Marketplace",
    },
    {
      id: 3,
      name: "Video Counselling",
      icon: VideoIcon,
      route: "/Marketplace",
    },
    { 
      id: 4, 
      name: "Edu Loans", 
      icon: EduLoansIcon,
      route: "/Universities",
    },
    { 
      id: 5, 
      name: "Q&A Panel", 
      icon: QAIcon, 
      route: "/Marketplace",
    },
    {
      id: 6,
      name: "Verify Your University",
      icon: UniversityIcon,
      route: "/Universities",
    },
    {
      id: 7,
      name: "Post Admission Services",
      icon: PostAdmissionIcon,
      route: "/Universities",
    },
    { 
      id: 8, 
      name: "Create Resume", 
      icon: ResumeIcon,
      route: "/Marketplace", 
    },
    {
      id: 9,
      name: "Career Guides & Tips",
      icon: OnlineEduIcon,
      route: "/Marketplace",
    },
    { 
      id: 10, 
      name: "Career Finder", 
      icon: FinderIcon,
      route: "/Universities", 
    },
    {
      id: 11,
      name: "Refer & Earn",
      icon: ReferIcon,
    },
    {
      id: 12,
      name: "Online Education Trends",
      icon: OnlineEduIcon,
    },
    {
      id: 13,
      name: "Community",
      icon: CommunityIcon,
    },
    {
      id: 14,
      name: "Subsidy Cashback",
      icon: SubsidyIcon,
    },
    {
      id: 15,
      name: "ROI Calculator",
      icon: ROIIcon,
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const displayedItems = expanded ? content : content.slice(0, 6);

  return (
    <div className="py-10 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 bg-white mx-auto px-8 py-10 rounded-2xl shadow-xl shadow-blue-500/30 transition-all duration-700">
        {displayedItems.map((item) => (
          <Link
            to={item.route || "#"}
            key={item.id}
            className="flex flex-col text-center items-center justify-center p-4 hover:scale-110 ease-in-out transition-transform"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-20 h-20 mb-2 object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.src = '/placeholder-icon.png';
              }}
            />
            <h3 className="text-lg font-semibold text-blue-800">{item.name}</h3>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-md shadow-lg border border-blue-500 hover:border-blue-500 hover:bg-white hover:text-blue-500 hover:scale-110 transition"
        >
          {expanded ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default Platform;