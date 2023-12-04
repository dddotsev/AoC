
namespace Main
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var lines = File.ReadAllLines("input.txt");

            var ans1 = GetAns1(lines);
            Console.WriteLine(ans1);

            var ans2 = GetAns2(lines);
            Console.WriteLine(ans2);
        }

        private static int GetAns1 (string[] lines)
        {
            var sum = lines
                .Select(GetLineMatchesCount)
                .Sum(x => x > 0
                            ? (1 << (x - 1))
                            : 0);

            return sum;
        }

        private static int GetLineMatchesCount(string line)
        {
            int lineNum = -1;
            int curNum = -1;
            int matches = 0;
            bool inSecondPart = false;
            bool[] winning = new bool[100];
            foreach (char c in line)
            {
                if (c == '|')
                {
                    inSecondPart = true;
                    continue;
                }

                if (c < '0' || c >'9')
                {
                    if (curNum < 0)
                    {
                        continue;
                    }
                    else if (lineNum == -1)
                    {
                        lineNum = curNum;
                    }
                    else if (!inSecondPart)
                    {
                        winning[curNum]=true;
                    }
                    else if (winning[curNum])
                    {
                        matches++;
                    }

                    curNum = -1;

                    continue;
                }

                int num = c - '0';
                curNum = curNum == -1 ? num : curNum * 10 + num;
            }

            if (curNum > -1 && winning[curNum])
            {
                matches++;
            }

            return matches;
        }

        private static int GetAns2 (string[] lines)
        {
            var matchedCounts = new List<int>();

            for (int i = lines.Length - 1; i >= 0; i--)
            {
                int matches = GetLineMatchesCount(lines[i]);
                int newMatches = matches + matchedCounts.TakeLast(matches).Sum();

                matchedCounts.Add(newMatches);
            }

            return matchedCounts.Sum() + lines.Length;
        }
    }
}
