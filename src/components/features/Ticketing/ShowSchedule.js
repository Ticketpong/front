const ShowSchedule = (data) => {
  // 데이터를 가공하여 출력
  const processedData = data.flatMap((item) => {
    const { mt20id, prfpdfrom, prfpdto, dtguidance } = item;
    const startDate = new Date(prfpdfrom);
    const endDate = new Date(prfpdto);

    // 날짜와 요일에 대한 정보를 계산하여 매핑
    const schedule = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dayOfWeekKorean = d.toLocaleDateString("ko-KR", {
        weekday: "short",
      });

      // HOL은 무시
      if (dayOfWeekKorean === "일" && dtguidance.includes("일요일")) {
        const times = dtguidance.match(/일요일\(([^)]*)\)/)[1].split(",");
        times.forEach((time) => {
          const [hour, minute] = time.trim().split(":");
          schedule.push({
            mt20id,
            playSeq: String(schedule.length + 1).padStart(3, "0"),
            playDate: `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
              2,
              "0"
            )}${String(d.getDate()).padStart(2, "0")}`,
            playTime: `${hour}${minute}`,
            VIP: 30, // 예시로 VIP 좌석 수 추가
            R: 30, // 예시로 R 좌석 수 추가
            S: 30, // 예시로 S 좌석 수 추가
            A: 30, // 예시로 A 좌석 수 추가
          });
        });
      } else {
        const dayGuidance = dtguidance.match(
          new RegExp(`${dayOfWeekKorean}[^,]*\\(([^)]*)\\)`)
        );
        if (dayGuidance && dayGuidance[1]) {
          const times = dayGuidance[1].split(",");
          times.forEach((time) => {
            const [hour, minute] = time.trim().split(":");
            schedule.push({
              mt20id,
              playSeq: String(schedule.length + 1).padStart(3, "0"),
              playDate: `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
                2,
                "0"
              )}${String(d.getDate()).padStart(2, "0")}`,
              playTime: `${hour}${minute}`,
              VIP: 30, // 예시로 VIP 좌석 수 추가
              R: 30, // 예시로 R 좌석 수 추가
              S: 30, // 예시로 S 좌석 수 추가
              A: 30, // 예시로 A 좌석 수 추가
            });
          });
        }
      }
    }

    return schedule;
  });

  // 렌더링 없는 컴포넌트이므로 null 반환
  return processedData;
};

export default ShowSchedule;
