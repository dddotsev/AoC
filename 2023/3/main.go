package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	lines := readLines("input.txt")

	ans1 := getAns1(lines)
	fmt.Println(ans1)

	ans2 := getAns2(lines)
	fmt.Println(ans2)
}

func getAns2(lines []string) int {
	sum := 0

	for i := 0; i < len(lines); i++ {
		for j := 0; j < len(lines[i]); j++ {
			cur := lines[i][j]

			if cur != '*' {
				continue
			}

			sum += findRatio(lines, i, j)
		}
	}

	return sum
}

type Coord struct {
	i, j int
}

func findRatio(lines []string, i int, j int) int {
	var nums []Coord

	// line above
	if isDigit(lines, i-1, j-1) {
		nums = append(nums, Coord{i - 1, j - 1})
	}
	if isDigit(lines, i-1, j) && !isDigit(lines, i-1, j-1) {
		nums = append(nums, Coord{i - 1, j})
	}
	if isDigit(lines, i-1, j+1) && !isDigit(lines, i-1, j) {
		nums = append(nums, Coord{i - 1, j + 1})
	}

	// current line
	if isDigit(lines, i, j-1) {
		nums = append(nums, Coord{i, j - 1})
	}
	if isDigit(lines, i, j+1) {
		nums = append(nums, Coord{i, j + 1})
	}

	// line below
	if isDigit(lines, i+1, j-1) {
		nums = append(nums, Coord{i + 1, j - 1})
	}
	if isDigit(lines, i+1, j) && !isDigit(lines, i+1, j-1) {
		nums = append(nums, Coord{i + 1, j})
	}
	if isDigit(lines, i+1, j+1) && !isDigit(lines, i+1, j) {
		nums = append(nums, Coord{i + 1, j + 1})
	}

	if len(nums) != 2 {
		return 0
	}

	num1 := findNumber(lines, nums[0].i, nums[0].j)
	num2 := findNumber(lines, nums[1].i, nums[1].j)

	return num1 * num2
}

func findNumber(lines []string, i int, j int) int {
	num := 0

	tens := 1
	for z := j - 1; isDigit(lines, i, z); z-- {
		cur := char2int(lines[i][z])
		num = cur*tens + num

		tens *= 10
	}

	num = num*10 + char2int(lines[i][j])

	for z := j + 1; isDigit(lines, i, z); z++ {
		cur := char2int(lines[i][z])
		num = num*10 + cur
	}

	return num
}

func isDigit(lines []string, i int, j int) bool {
	if i < 0 || i >= len(lines) {
		return false
	}

	if j < 0 || j >= len(lines[i]) {
		return false
	}

	return lines[i][j] >= '0' && lines[i][j] <= '9'
}

func getAns1(lines []string) int {
	sum := 0
	sumCurrent := false
	currentNum := 0

	for i := 0; i < len(lines); i++ {
		for j := 0; j < len(lines[i]); j++ {
			cur := lines[i][j]
			if cur >= '0' && cur <= '9' {
				currentNum *= 10
				currentNum += char2int(cur)

				if sumCurrent || j == 0 { // already marked for sum or first column
					continue
				}

				sumCurrent = checkColumn(i, j-1, lines)
			} else {
				if currentNum != 0 {
					sumCurrent = sumCurrent || (j != 0 && checkColumn(i, j-1, lines)) || checkColumn(i, j, lines)

					if sumCurrent {
						sum += currentNum
					}
				}

				currentNum = 0
				sumCurrent = false
			}
		}

		if currentNum != 0 {
			sumCurrent = sumCurrent || checkColumn(i, len(lines[i])-1, lines)

			if sumCurrent {
				sum += currentNum
			}

			currentNum = 0
			sumCurrent = false
		}
	}

	return sum
}

func checkColumn(i int, j int, lines []string) bool {
	shouldSum := false

	shouldSum = i != 0 && isSymbol(lines[i-1][j])
	shouldSum = shouldSum || isSymbol(lines[i][j])
	shouldSum = shouldSum || (i+1 < len(lines) && isSymbol(lines[i+1][j]))

	return shouldSum
}

func isSymbol(c byte) bool {
	return c != '.' && (c < '0' || c > '9')
}

func char2int(c byte) int {
	return int(c - '0')
}

func readLines(path string) []string {
	file, _ := os.Open(path)
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines
}
