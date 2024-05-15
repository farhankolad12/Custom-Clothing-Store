import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function HomePageSetting({ data }: { data: any }) {
  const [mainSlider, setMainSlider] = useState<any>(
    data?.homePageContent?.mainSliders
      ? data?.homePageContent?.mainSliders
      : [
          {
            id: Math.floor(Math.random() * 999999),
            img: undefined,
            title: "",
            description: "",
            buttonName: "",
            buttonLink: "",
          },
          {
            id: Math.floor(Math.random() * 999999),
            img: undefined,
            title: "",
            description: "",
            buttonName: "",
            buttonLink: "",
          },
          {
            id: Math.floor(Math.random() * 999999),
            img: undefined,
            title: "",
            description: "",
            buttonName: "",
            buttonLink: "",
          },
          {
            id: Math.floor(Math.random() * 999999),
            img: undefined,
            title: "",
            description: "",
            buttonName: "",
            buttonLink: "",
          },
        ]
  );
  const [videoSection, setVideoSection] = useState<any>(
    data?.homePageContent?.videoSection
      ? data?.homePageContent?.videoSection
      : undefined
  );
  const [firstBanner, setFirstBanner] = useState<any>(
    data?.homePageContent?.firstBanner
      ? data?.homePageContent?.firstBanner
      : undefined
  );
  const [secondBanner, setSecondBanner] = useState<any>(
    data?.homePageContent?.secondBanner
      ? data?.homePageContent?.secondBanner
      : undefined
  );
  const [thirdBanner, setThirdBanner] = useState<any>(
    data?.homePageContent?.thirdBanner
      ? data?.homePageContent?.thirdBanner
      : undefined
  );

  const { error, execute, loading } = usePostReq("/home-page");
  const headerTextRef = useRef<HTMLInputElement>(null!);

  async function handleChanges(changeType: string, data: any) {
    try {
      const formData = new FormData();

      formData.append("changeType", changeType);
      formData.append(
        "data",
        typeof data === "string" ? data : JSON.stringify(data)
      );

      if (changeType === "mainSliders") {
        for (let i = 0; i < mainSlider.length; i++) {
          const slider = mainSlider[i];

          if (!slider.img.id) {
            formData.append(slider.id.toString(), slider.img);
          }
        }
      }

      if (changeType === "videoSection") {
        if (!videoSection.thumbnailImg.id) {
          formData.append("thumbnail", videoSection.thumbnailImg);
        }

        if (!videoSection.video.id) {
          formData.append("video", videoSection.video);
        }
      }

      if (
        changeType === "firstBanner" ||
        changeType === "secondBanner" ||
        changeType === "thirdBanner"
      ) {
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
      toast.error(err || "Something went wrong");
    }
  }

  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
      tabIndex={0}
    >
      <div className="p-4" style={{ backgroundColor: "#1f2937" }}>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Header</strong>
          </div>
          <div className="my-4 d-flex flex-lg-row flex-column justify-content-between px-5">
            <label htmlFor="header-text" className="w-100">
              Header Text
            </label>
            <input
              defaultValue={data.homePageContent?.headerText || ""}
              ref={headerTextRef}
              type="text"
              placeholder="10% DISCOUNT FOR REGISTERED USERS & FREE SHIPPING FOR ORDERS OVER 900 PLUS FREE RETURNS"
              className="form-control w-100 bg-secondary text-white"
            />
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={() =>
              handleChanges("headerText", headerTextRef.current.value)
            }
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            Save Changes
          </button>
        </section>
        <section className="text-secondary fw-bold">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Main Slider</strong>
          </div>
          <nav className="mt-3 px-5">
            <div className="nav  nav-tabs" id="nav-tab" role="tablist">
              {mainSlider.map((slider: any, i: number) => {
                return (
                  <button
                    key={slider.id}
                    className={`nav-link ${i === 0 ? "active" : ""}`}
                    id={`nav-slider${i + 1}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#nav-slider${i + 1}`}
                    type="button"
                    role="tab"
                    aria-controls={`nav-slider${i + 1}`}
                    aria-selected={i + 1 === 0}
                  >
                    Slider {i + 1}
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="tab-content px-5" id="nav-tabContent">
            {mainSlider.map((slider: any, i: number) => {
              return (
                <div
                  key={slider.id}
                  className={`tab-pane fade ${i === 0 ? "show active" : ""}`}
                  id={`nav-slider${i + 1}`}
                  role="tabpanel"
                  aria-labelledby={`nav-slider${i + 1}-tab`}
                  tabIndex={0}
                >
                  <div className="mt-4 d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                        <label htmlFor={`slider-img${i + 1}`} className="w-100">
                          Image
                        </label>
                        <input
                          onChange={(e) => {
                            setMainSlider((prev: any) => {
                              return prev.map((slider1: any) => {
                                return slider1.id === slider.id
                                  ? { ...slider1, img: e.target.files?.[0] }
                                  : slider1;
                              });
                            });
                          }}
                          type="file"
                          id={`slider-img${i + 1}`}
                          className="form-control bg-secondary text-white w-100"
                        />
                      </div>
                      {slider.img && (
                        <div className="d-flex justify-content-end">
                          <Image
                            src={
                              slider.img.id
                                ? slider.img.link
                                : URL.createObjectURL(slider.img)
                            }
                            width={100}
                            height={100}
                            alt="Slider"
                          />
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                      <label htmlFor={`slider-title${i + 1}`} className="w-100">
                        Title
                      </label>
                      <input
                        onChange={(e) => {
                          setMainSlider((prev: any) => {
                            return prev.map((slider1: any) => {
                              return slider1.id === slider.id
                                ? { ...slider1, title: e.target.value }
                                : slider1;
                            });
                          });
                        }}
                        value={slider.title}
                        type="text"
                        placeholder="Slider title"
                        id={`slider-title${i + 1}`}
                        className="form-control bg-secondary text-white w-100"
                      />
                    </div>
                    <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                      <label
                        htmlFor={`slider-description${i + 1}`}
                        className="w-100"
                      >
                        Description
                      </label>
                      <textarea
                        onChange={(e) => {
                          setMainSlider((prev: any) => {
                            return prev.map((slider1: any) => {
                              return slider1.id === slider.id
                                ? { ...slider1, description: e.target.value }
                                : slider1;
                            });
                          });
                        }}
                        value={slider.description}
                        cols={7}
                        placeholder="Slider Description"
                        id={`slider-description${i + 1}`}
                        className="form-control bg-secondary text-white w-100"
                      />
                    </div>
                    <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                      <label
                        htmlFor={`slider-btn-name${i + 1}`}
                        className="w-100"
                      >
                        Button Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setMainSlider((prev: any) => {
                            return prev.map((slider1: any) => {
                              return slider1.id === slider.id
                                ? { ...slider1, buttonName: e.target.value }
                                : slider1;
                            });
                          });
                        }}
                        value={slider.buttonName}
                        placeholder="Slider button name"
                        id={`slider-btn-name${i + 1}`}
                        className="form-control bg-secondary text-white w-100"
                      />
                    </div>
                    <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                      <label
                        htmlFor={`slider-btn-link${i + 1}`}
                        className="w-100"
                      >
                        Button Link
                      </label>
                      <input
                        onChange={(e) => {
                          setMainSlider((prev: any) => {
                            return prev.map((slider1: any) => {
                              return slider1.id === slider.id
                                ? { ...slider1, buttonLink: e.target.value }
                                : slider1;
                            });
                          });
                        }}
                        type="text"
                        value={slider.buttonLink}
                        placeholder="Slider button link"
                        id={`slider-btn-link${i + 1}`}
                        className="form-control bg-secondary text-white w-100"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleChanges("mainSliders", mainSlider)}
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
                      return { ...prev, thumbnailImg: e.target.files?.[0] };
                    });
                  }}
                  type="file"
                  id="thumbnail-img"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              {videoSection?.thumbnailImg && (
                <div className="d-flex justify-content-end">
                  <Image
                    src={
                      videoSection.thumbnailImg.id
                        ? videoSection.thumbnailImg.link
                        : URL.createObjectURL(videoSection.thumbnailImg)
                    }
                    width={100}
                    height={100}
                    alt="thumbnailImg"
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
        <div className="d-flex gap-2 text-secondary pb-2 border-bottom border-white align-items-center">
          <i className="bi bi-gear" />
          <strong className="fw-bold">First Category Section</strong>
        </div>
        <div className="px-5">
          <section className="text-secondary fw-bold mt-4">
            <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
              <i className="bi bi-gear" />
              <strong className="fw-bold">First Banner</strong>
            </div>
            <div className="mt-4 d-flex flex-column gap-4 px-5">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                  <label htmlFor="banner1-img" className="w-100">
                    Image
                  </label>
                  <input
                    onChange={(e) => {
                      setFirstBanner((prev: any) => {
                        return { ...prev, img: e.target.files?.[0] };
                      });
                    }}
                    type="file"
                    id="banner1-img"
                    className="form-control bg-secondary text-white w-100"
                  />
                </div>
                {firstBanner?.img && (
                  <div className="d-flex justify-content-end">
                    <Image
                      src={
                        firstBanner.img.id
                          ? firstBanner.img.link
                          : URL.createObjectURL(firstBanner.img)
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
                    setFirstBanner((prev: any) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  value={firstBanner?.title || ""}
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
                    setFirstBanner((prev: any) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                  value={firstBanner?.description || ""}
                  cols={7}
                  placeholder="Banner Description"
                  id="banner1-description"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="banner1-btn-link" className="w-100">
                  Category
                </label>
                <select
                  defaultValue={firstBanner?.categoryName || "0"}
                  onChange={(e) => {
                    setFirstBanner((prev: any) => {
                      return { ...prev, categoryName: e.target.value };
                    });
                  }}
                  name=""
                  className="form-select"
                  id=""
                >
                  <option value="0" disabled selected>
                    Please select a category
                  </option>
                  {data?.categories.map((category: any) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              disabled={loading}
              type="button"
              onClick={() => handleChanges("firstBanner", firstBanner)}
              className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
            >
              Save Changes
            </button>
          </section>
          <section className="text-secondary fw-bold">
            <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
              <i className="bi bi-gear" />
              <strong className="fw-bold">Second Banner</strong>
            </div>
            <div className="mt-4 d-flex flex-column gap-4 px-5">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                  <label htmlFor="banner2-img" className="w-100">
                    Image
                  </label>
                  <input
                    onChange={(e) => {
                      setSecondBanner((prev: any) => {
                        return { ...prev, img: e.target.files?.[0] };
                      });
                    }}
                    type="file"
                    id="banner2-img"
                    className="form-control bg-secondary text-white w-100"
                  />
                </div>
                {secondBanner?.img && (
                  <div className="d-flex justify-content-end">
                    <Image
                      src={
                        secondBanner.img.id
                          ? secondBanner.img.link
                          : URL.createObjectURL(secondBanner.img)
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
                    setSecondBanner((prev: any) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  value={secondBanner?.title || ""}
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
                    setSecondBanner((prev: any) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                  value={secondBanner?.description || ""}
                  cols={7}
                  placeholder="Banner Description"
                  id="banner1-description"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="banner1-btn-link" className="w-100">
                  Category
                </label>
                <select
                  defaultValue={secondBanner?.categoryName || "0"}
                  onChange={(e) => {
                    setSecondBanner((prev: any) => {
                      return { ...prev, categoryName: e.target.value };
                    });
                  }}
                  name=""
                  className="form-select"
                  id=""
                >
                  <option value="0" disabled selected>
                    Please select a category
                  </option>
                  {data?.categories.map((category: any) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              disabled={loading}
              type="button"
              onClick={() => handleChanges("secondBanner", secondBanner)}
              className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
            >
              Save Changes
            </button>
          </section>
          <section className="text-secondary fw-bold">
            <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
              <i className="bi bi-gear" />
              <strong className="fw-bold">Third Banner</strong>
            </div>
            <div className="mt-4 d-flex flex-column gap-4 px-5">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                  <label htmlFor="banner2-img" className="w-100">
                    Image
                  </label>
                  <input
                    onChange={(e) => {
                      setThirdBanner((prev: any) => {
                        return { ...prev, img: e.target.files?.[0] };
                      });
                    }}
                    type="file"
                    id="banner2-img"
                    className="form-control bg-secondary text-white w-100"
                  />
                </div>
                {thirdBanner?.img && (
                  <div className="d-flex justify-content-end">
                    <Image
                      src={
                        thirdBanner.img.id
                          ? thirdBanner.img.link
                          : URL.createObjectURL(thirdBanner.img)
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
                    setThirdBanner((prev: any) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  value={thirdBanner?.title || ""}
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
                    setThirdBanner((prev: any) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                  value={thirdBanner?.description || ""}
                  cols={7}
                  placeholder="Banner Description"
                  id="banner1-description"
                  className="form-control bg-secondary text-white w-100"
                />
              </div>
              <div className="d-flex justify-content-between gap-1 flex-lg-row flex-column">
                <label htmlFor="banner1-btn-link" className="w-100">
                  Category
                </label>
                <select
                  defaultValue={thirdBanner?.categoryName || "0"}
                  onChange={(e) => {
                    setThirdBanner((prev: any) => {
                      return { ...prev, categoryName: e.target.value };
                    });
                  }}
                  name=""
                  className="form-select"
                  id=""
                >
                  <option value="0" disabled selected>
                    Please select a category
                  </option>
                  {data?.categories.map((category: any) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              disabled={loading}
              type="button"
              onClick={() => handleChanges("thirdBanner", thirdBanner)}
              className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
            >
              Save Changes
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
