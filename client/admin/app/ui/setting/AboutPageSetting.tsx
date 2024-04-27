import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AboutPageSetting({ data }: { data: any }) {
  const [topImage, setTopImage] = useState<any>(data?.topImage || undefined);
  const [firstAbout, setFirstAbout] = useState<any>(
    data?.firstAbout || undefined
  );
  const [secondAbout, setSecondAbout] = useState<any>(
    data?.secondAbout || undefined
  );
  const [videoSection, setVideoSection] = useState<any>(
    data?.videoSection || undefined
  );

  const { error, execute, loading } = usePostReq("/about-page");

  async function handleChanges(changeType: string, data: any) {
    try {
      const formData = new FormData();

      formData.append("changeType", changeType);

      if (changeType === "topImage") {
        formData.append("topImage", data);
      }

      if (changeType === "videoSection") {
        if (!data.thumbnail.id) {
          formData.append("thumbnail", data.thumbnail);
        }

        if (!data.video.id) {
          formData.append("video", data.video);
        }
      }

      if (changeType === "firstAbout" || changeType === "secondAbout") {
        formData.append("data", JSON.stringify(data));
        if (!data.img.id) {
          formData.append(changeType + "Img", data.img);
        }
      }

      const res = await execute(formData);

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      toast.success("Changes saved!");
    } catch (err: any) {
      console.log(err);

      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <div
      className="tab-pane fade"
      id="pills-about"
      role="tabpanel"
      aria-labelledby="pills-about-tab"
      tabIndex={0}
    >
      <div className="p-4" style={{ backgroundColor: "#1f2937" }}>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Top Image</strong>
          </div>
          <div className="d-flex flex-column gap-4">
            <div className="my-4 d-flex flex-lg-row flex-column justify-content-between px-5">
              <label htmlFor="top-image" className="w-100">
                Image
              </label>
              <input
                // defaultValue={data.homePageContent.headerText || ""}
                // ref={headerTextRef}
                type="file"
                onChange={(e) => {
                  setTopImage(e.target.files?.[0]);
                }}
                id="top-image"
                className="form-control w-100 bg-secondary text-white"
              />
            </div>
            {topImage && (
              <div className="d-flex mx-auto">
                <Image
                  src={
                    topImage?.id ? topImage.link : URL.createObjectURL(topImage)
                  }
                  width={100}
                  height={100}
                  alt="Top Image"
                />
              </div>
            )}
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={() => handleChanges("topImage", topImage)}
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            Save Changes
          </button>
        </section>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">First About</strong>
          </div>
          <div className="mt-4 d-flex flex-column gap-4 px-5">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="banner1-img" className="w-100">
                  Image
                </label>
                <input
                  onChange={(e) => {
                    setFirstAbout((prev: any) => {
                      return { ...prev, img: e.target.files?.[0] };
                    });
                  }}
                  type="file"
                  id="banner1-img"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              {firstAbout?.img && (
                <div className="d-flex justify-content-end">
                  <Image
                    src={
                      firstAbout.img.id
                        ? firstAbout.img.link
                        : URL.createObjectURL(firstAbout.img)
                    }
                    width={100}
                    height={100}
                    alt="Banner"
                  />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner1-title" className="w-100">
                Title
              </label>
              <input
                onChange={(e) => {
                  setFirstAbout((prev: any) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
                value={firstAbout?.title || ""}
                type="text"
                placeholder="Banner title"
                id="banner1-title"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner1-description" className="w-100">
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setFirstAbout((prev: any) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
                value={firstAbout?.description || ""}
                cols={7}
                placeholder="Banner Description"
                id="banner1-description"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner1-btn-name" className="w-100">
                Button Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setFirstAbout((prev: any) => {
                    return { ...prev, buttonName: e.target.value };
                  });
                }}
                value={firstAbout?.buttonName || ""}
                placeholder="Banner button name"
                id="banner1-btn-name"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner1-btn-link" className="w-100">
                Button Link
              </label>
              <input
                onChange={(e) => {
                  setFirstAbout((prev: any) => {
                    return { ...prev, buttonLink: e.target.value };
                  });
                }}
                type="text"
                value={firstAbout?.buttonLink || ""}
                placeholder="Banner button link"
                id="banner1-btn-link"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={() => handleChanges("firstAbout", firstAbout)}
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            Save Changes
          </button>
        </section>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Second About</strong>
          </div>
          <div className="mt-4 d-flex flex-column gap-4 px-5">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="banner2-img" className="w-100">
                  Image
                </label>
                <input
                  onChange={(e) => {
                    setSecondAbout((prev: any) => {
                      return { ...prev, img: e.target.files?.[0] };
                    });
                  }}
                  type="file"
                  id="banner2-img"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              {secondAbout?.img && (
                <div className="d-flex justify-content-end">
                  <Image
                    src={
                      secondAbout.img.id
                        ? secondAbout.img.link
                        : URL.createObjectURL(secondAbout.img)
                    }
                    width={100}
                    height={100}
                    alt="Banner"
                  />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner2-title" className="w-100">
                Title
              </label>
              <input
                onChange={(e) => {
                  setSecondAbout((prev: any) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
                value={secondAbout?.title || ""}
                type="text"
                placeholder="Banner title"
                id="banner2-title"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner2-description" className="w-100">
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setSecondAbout((prev: any) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
                value={secondAbout?.description || ""}
                cols={7}
                placeholder="Banner Description"
                id="banner2-description"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner2-btn-name" className="w-100">
                Button Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setSecondAbout((prev: any) => {
                    return { ...prev, buttonName: e.target.value };
                  });
                }}
                value={secondAbout?.buttonName || ""}
                placeholder="Banner button name"
                id="banner2-btn-name"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
            <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
              <label htmlFor="banner2-btn-link" className="w-100">
                Button Link
              </label>
              <input
                onChange={(e) => {
                  setSecondAbout((prev: any) => {
                    return { ...prev, buttonLink: e.target.value };
                  });
                }}
                type="text"
                value={secondAbout?.buttonLink || ""}
                placeholder="Banner button link"
                id="banner2-btn-link"
                className="form-control bg-secondary text-white w-100"
              />
            </div>
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={() => handleChanges("secondAbout", secondAbout)}
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            Save Changes
          </button>
        </section>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Video Section</strong>
          </div>
          <div className="d-flex flex-column gap-4 mt-4 px-4">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="thumbnail-img" className="w-100">
                  Thumbnail Image
                </label>
                <input
                  onChange={(e) => {
                    setVideoSection((prev: any) => {
                      return { ...prev, thumbnail: e.target.files?.[0] };
                    });
                  }}
                  type="file"
                  id="thumbnail-img"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              {videoSection?.thumbnail && (
                <div className="d-flex justify-content-end">
                  <Image
                    src={
                      videoSection.thumbnail.id
                        ? videoSection.thumbnail.link
                        : URL.createObjectURL(videoSection.thumbnail)
                    }
                    width={100}
                    height={100}
                    alt="thumbnail"
                  />
                </div>
              )}
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="video" className="w-100">
                  Video
                </label>
                <input
                  onChange={(e) => {
                    setVideoSection((prev: any) => {
                      return { ...prev, video: e.target.files?.[0] };
                    });
                  }}
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  id="video"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              {videoSection?.video && (
                <div className="d-flex justify-content-end w-100">
                  <video width="500" height="500" controls>
                    <source
                      src={
                        videoSection.video.id
                          ? videoSection.video.link
                          : URL.createObjectURL(videoSection.video)
                      }
                      //   type="video/mp4"
                    />
                  </video>
                </div>
              )}
            </div>
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={() => handleChanges("videoSection", videoSection)}
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            Save Changes
          </button>
        </section>
      </div>
    </div>
  );
}
