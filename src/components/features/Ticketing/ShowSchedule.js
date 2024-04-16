const ShowSchedule = (data) => {
  const processedData = data.flatMap((item) => {
    const { mt20id, prfpdfrom, prfpdto, dtguidance } = item;

    // 공연 안내 정보에서 쉼표와 공백 제거
    const replaced = dtguidance.replaceAll(", ", "");
    // 각 섹션을 )를 기준으로 분할
    const splitted = replaced.split(")");
    // 섹션 배열 생성. 각 섹션에 )를 다시 추가하여 원래 형태로 복원
    const sections = splitted.map((item, index) => {
      return item + ")";
    });

    const schedules = []; // 각 섹션의 스케줄 저장 배열

    const startDate = new Date(prfpdfrom); // 공연 시작 날짜
    const endDate = new Date(prfpdto); // 공연 종료 날짜

    let currentDate = new Date(startDate); // 현재 날짜를 시작 날짜로 설정

    // 공연 시작일부터 공연 종료일까지 반복하며 스케줄 생성
    while (currentDate <= endDate) {
      // 각 섹션을 순회하며 스케줄 생성
      sections.forEach((section) => {
        // 섹션이 비어 있거나 마지막 섹션인 경우 무시
        if (!section.trim() || section === sections[sections.length - 1])
          return;

        // 섹션에서 날짜 정보 추출
        const daysStr = section.split("(")[0].trim();
        let days = [];
        if (daysStr.includes("~")) {
          // 날짜 범위가 지정된 경우
          const [startDay, endDay] = daysStr
            .split("~")
            .map((day) => day.trim());
          const startIdx = [
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
            "일요일",
          ].indexOf(startDay);
          const endIdx = [
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
            "일요일",
          ].indexOf(endDay);

          days = [
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
            "일요일",
          ].slice(startIdx, endIdx + 1);
        } else {
          // 특정 날짜만 지정된 경우
          const day = daysStr;
          if (
            [
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
              "일요일",
            ].includes(day)
          ) {
            days = [day];
          }
        }

        // 섹션에서 시간 정보 추출

        // 괄호로 둘러싸인 임의의 문자열 서치
        const timesMatch = section.match(/\((.*?)\)/);
        if (!timesMatch) return;
        const timesStr = timesMatch[1];
        const times = timesStr.split(",");

        // 날짜와 시간을 조합하여 스케줄 생성
        days.forEach((day) => {
          if (
            currentDate.getDay() ===
            [
              "일요일",
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
            ].indexOf(day)
          ) {
            times.forEach((time) => {
              const [hour, minute] = time.trim().split(":");
              if (!day.includes("HOL")) {
                schedules.push({
                  mt20id,
                  // 스케줄 번호를 3자리로 맞추고 0으로 채움
                  playSeq: String(schedules.length + 1).padStart(3, "0"),
                  // YYYYMMDD 형식으로 변환된 날짜
                  playDate: `${currentDate.getFullYear()}${String(
                    currentDate.getMonth() + 1
                  ).padStart(2, "0")}${String(currentDate.getDate()).padStart(
                    2,
                    "0"
                  )}`,
                  // 시간 정보
                  playTime: `${hour}${minute}`,
                  // 예약된 좌석 수
                  VIP: 30,
                  R: 30,
                  S: 30,
                  A: 30,
                });
              }
            });
          }
        });
      });

      // 다음 날짜로 이동
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedules;
  });
  return processedData;
};

export default ShowSchedule;
