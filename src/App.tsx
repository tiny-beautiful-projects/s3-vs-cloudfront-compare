import { useState } from "react";

const imageNames = [
  { name: "Benjamin", path: "benjamin-chambon-9SFWp9AuboQ-unsplash.jpg" },
  { name: "Denis 1", path: "denis-j7TdsvtRJcU-unsplash.jpg" },
  { name: "Denis 2", path: "denis-UWJNmnj4W2Y-unsplash.jpg" },
];

export default function S3TestPage() {
  const [useCdn, setUseCdn] = useState<boolean>(false);
  const [domain, setDomain] = useState(
    "https://yunajoe-image-compare-bucket.s3.ap-northeast-2.amazonaws.com",
  );

  // s3 이미지로 변환
  const handleChangeToS3 = () => {
    setUseCdn(false);
    setDomain(
      "https://yunajoe-image-compare-bucket.s3.ap-northeast-2.amazonaws.com",
    );
  };

  // cdn 이미지로 변환
  const handleChangeToCDN = () => {
    setUseCdn(true);
    setDomain("https://d15pihtx8jb5rq.cloudfront.net");
  };

  const images = imageNames.map((image) => {
    return {
      name: image.name,
      url: `${domain}/${image.path}`,
    };
  });

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">
        이미지 CDN(CloudFront) 성능 비교 프로젝트
      </h1>
      <div className="flex gap-4 mb-6 p-4 bg-gray-100 rounded-lg items-center justify-between">
        <div>
          <span className="font-semibold">현재 모드: </span>
          <span
            className={
              useCdn ? "text-green-600 font-bold" : "text-orange-600 font-bold"
            }
          >
            {useCdn
              ? "🚀 AWS CloudFront CDN 적용 중"
              : "🐢 S3 원본 서버 직접 호출 (미적용)"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleChangeToS3}
            className={`px-4 py-2 rounded font-medium ${!useCdn ? "bg-orange-500 text-white shadow" : "bg-white border"}`}
          >
            미적용 (S3 직통)
          </button>
          <button
            onClick={handleChangeToCDN}
            className={`px-4 py-2 rounded font-medium ${useCdn ? "bg-green-600 text-white shadow" : "bg-white border"}`}
          >
            적용 (CloudFront)
          </button>
        </div>
      </div>

      {images.map((image) => (
        <div key={image.url}>
          <h2>{image.name}</h2>
          <img src={image.url} alt={image.name} width={500} />
        </div>
      ))}
    </main>
  );
}
