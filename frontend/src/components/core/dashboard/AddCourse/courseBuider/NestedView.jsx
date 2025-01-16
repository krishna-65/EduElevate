import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import SubSectionModal from "./SubSectonModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseAPI";
import { enqueueSnackbar } from "notistack";
import { setCourse } from "../../../../../store/reducers/course-reducers";

const NestedView = ({ handleChangedEditSection }) => {
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(false);
    const [viewSubSection, setViewSubSection] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        try {
            const result = await deleteSection({
                sectionId,
                courseId: course._id,
            });
            if (result) {
                enqueueSnackbar("Section deleted successfully", { variant: "success" });
                const updatedCourseContent = course.courseContent.filter((section)=>section._id !== result._id)
                const updatedCourse = {...course, courseContent:updatedCourseContent}
                dispatch(setCourse(updatedCourse));
                console.log("result: ", result);
            }
            setConfirmationModal(null);
        } catch (error) {
            enqueueSnackbar("Error deleting section", { variant: "error" });
        }
    };

    const handleDeleteSubSection = async (sectionId, subSectionId) => {
        try {
            const result = await deleteSubSection({
                sectionId,
                subSectionId,
            });
            if (result) {
                const updatedCourseContent = course.courseContent.map((section)=>section._id === sectionId ? result : section)
                enqueueSnackbar("Sub-Section deleted successfully", { variant: "success" });
                console.log("result: ", result);

                const updatedCourse = {...course, courseContent:updatedCourseContent}
                dispatch(setCourse(updatedCourse));
            }
            setConfirmationModal(null);
        } catch (error) {
            enqueueSnackbar("Error deleting sub-section", { variant: "error" });
        }
    };

        console.log(course);

    return (
        <div>
            <div className="mt-10 rounded px-8 py-4">
                {course?.courseContent?.map((section) => (
                    <details  key={section._id} open className="flex flex-col  mt-10">
                        <summary className="flex items-center justify-between gap-x-4 border-b-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleChangedEditSection(section._id, section.sectionName)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <span>|</span>
                                <BiSolidDownArrow className="text-xl" />
                            </div>
                        </summary>
                        {/* Section Subsection Rendering */}
                        <div className="p-3">
                                {section?.subSection?.map((data, index) => (
                                    <div
                                    key={index}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex items-center justify-between gap-x-3 border-b-2"
                                    >
                                    <div className="flex items-center gap-x-3">
                                        <RxDropdownMenu />
                                        <p>{data.title}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Edit Button */}
                                        <button
                                        onClick={() =>
                                            setEditSubSection({ ...data, sectionId: section._id })
                                        }
                                        >
                                        <MdEdit />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                        onClick={() =>
                                            setConfirmationModal({
                                            text1: "Delete this sub section",
                                            text2: "Selected lecture will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1handler: () =>
                                                handleDeleteSubSection({
                                                sectionId: section._id,
                                                subSectionId: data._id,
                                                }),
                                            btn2handler: () => setConfirmationModal(null),
                                            })
                                        }
                                        >
                                        <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                    </div>
                                ))}

                                {/* Add Lecture Button */}
                                <button
                                    onClick={() => setAddSubSection(section)}
                                    className="mt-4 flex items-center"
                                >
                                    Add Lecture
                                </button>
                                </div>

                         
                    </details>
                ))}
            </div>
            {/* Modals */}
            {addSubSection && (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />
            )}
            {viewSubSection && (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    setAddSubSection = {setAddSubSection}
                    add={true}
                />
            )}
            {editSubSection && (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    add={true}
                />
            )}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default NestedView;
