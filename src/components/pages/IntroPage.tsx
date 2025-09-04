import React from 'react';
import { Link } from 'react-router-dom';

// 이미지 import
import nojin9img from '/노진구.jpg';
import doraimg from '/도라에몽.jpg';
import visilimg from '/비실이.jpg';
import pigimg from '/퉁퉁이.jpg';

interface ReviewCardProps {
  profileImage: string;
  name: string;
  position: string;
  review: string;
  highlightedText?: string[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  profileImage,
  name,
  position,
  review,
  highlightedText = [],
}) => {
  const renderHighlightedText = (text: string) => {
    if (highlightedText.length === 0) return text;

    let result = text;
    highlightedText.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, 'g');
      result = result.replace(regex, `<span class="bg-yellow-300">$1</span>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-0">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
          <img
            src={profileImage}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-black text-sm mb-1">{name} 님</h4>
          <p className="text-gray-500 text-xs">{position}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {renderHighlightedText(review)}
      </p>
    </div>
  );
};

const IntroPage: React.FC = () => {
  const reviewData = [
    {
      profileImage: nojin9img,
      name: '노진구',
      position: '도라에몽 대표',
      review:
        "저는 기획자나 마케터로 일해서 디자인 쪽이 취약했어요. 그럴 때마다 DocGen을 통해서 전문가들과 협업했는데 항상 손발이 잘 맞았어요. 시작부터 끝까지 정말 제 동료처럼 일해주셔서 힘이 났죠. 혼자 일하다 보면 '내가 정말 잘 하는 건가?' 흔들릴 때가 오는데, 그럴 때 객관적인 조언을 들을 수 있는 것도 좋았어요.",
    },
    {
      profileImage: doraimg,
      name: '도라에몽',
      position: '도라에몽 본인',
      review:
        '특정 분야에 숙련된 분들과 협업할 때 DocGen을 많이 쓰고 있어요. 어떤 프로젝트의 목표와 가치에 공감하는 사람들이 유연하게 모여 일하고 싶지만, 항상 그럴 수는 없잖아요. 그런 일을 잘 하는 분들을 찾을 때 DocGen이 도움이 돼요.',
      highlightedText: [
        '특정 분야에 숙련된 분들과 협업할 때 DocGen을 많이 쓰고 있어요.',
        '그런 일을 잘 하는 분들을 찾을 때 DocGen이 도움이 돼요.',
      ],
    },
    {
      profileImage: visilimg,
      name: '비실이',
      position: '노진구 친구',
      review:
        '사업 초기부터 거의 모든 업무에서 DocGen을 써왔어요. 상세 페이지 기획, 사진 촬영, 디자인 같은 업무들을 모듈화해서, 각 분야 전문가분들과 일하고 있어요. 포트폴리오도 볼 수 있어서 어떤 결과물이 나올지 예측이 되는 것도 편했고요. 그래서 지금도 팀원들이 만족하면서 DocGen을 이용하고 있습니다.',
      highlightedText: [
        '그래서 지금도 팀원들이 만족하면서 DocGen을 이용하고 있습니다.',
      ],
    },
    {
      profileImage: pigimg,
      name: '퉁퉁이',
      position: '노진구 친구',
      review:
        '호랑이마케팅의 에제드님께 브랜드 디자인 시스템을 의뢰했어요. 처음엔 로고만 의뢰했는데, 결과물이 너무 좋아서 다른 디자인도 맡겼죠. 1인 기업은 시간하고 비용을 효율적으로 쓰는 게 생명이잖아요. 그런 면에서 DocGen은 언제든지 믿고 찾을 수 있는 곳이라고 생각해요.',
      highlightedText: [
        '호랑이마케팅의 에제드님께 브랜드 디자인 시스템을 의뢰했어요.',
        '결과물이 너무 좋아서 다른 디자인도 맡겼죠.',
        'DocGen은 언제든지 믿고 찾을 수 있는 곳이라고 생각해요.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 제공 서비스 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-black mb-4">Docgen</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI로 만드는 가장 쉬운 사업 문서
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                요구사항 문서 생성
              </h3>
              <p className="text-gray-600">
                AI를 활용하여 프로젝트 요구사항을 체계적으로 문서화합니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                기능 명세서 작성
              </h3>
              <p className="text-gray-600">
                시스템의 상세 기능을 명확하게 정의하고 문서화합니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                서비스 정책 문서
              </h3>
              <p className="text-gray-600">
                서비스 운영 정책과 가이드라인을 체계적으로 정리합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 이용 후기 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              믿고 맡길 수 있는 결과물
            </h2>
            <p className="text-lg text-black mb-4">고객 만족도 4.8점</p>
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-8 h-8 ${
                    index < 4
                      ? 'text-yellow-400'
                      : index === 4
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                  }`}
                  fill={index < 4 ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {index === 4 ? (
                    <defs>
                      <linearGradient
                        id="partialFill"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="90%" stopColor="currentColor" />
                        <stop offset="90%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  ) : null}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    fill={index === 4 ? 'url(#partialFill)' : undefined}
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewData.map((review, index) => (
              <ReviewCard
                key={index}
                profileImage={review.profileImage}
                name={review.name}
                position={review.position}
                review={review.review}
                highlightedText={review.highlightedText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            문서 생성 AI 서비스로 업무 효율성을 극대화하고 더 나은 결과물을
            만들어보세요
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            대시보드로 이동
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IntroPage;
