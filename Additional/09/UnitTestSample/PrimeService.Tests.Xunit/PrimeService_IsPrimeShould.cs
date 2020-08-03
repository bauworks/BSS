using Xunit;
using Prime.Services;

namespace Prime.UnitTests.Xunit.Services
{
    public class PrimeService_IsPrimeShould
    {
        private readonly PrimeService primeService;

        public PrimeService_IsPrimeShould()
        {
            this.primeService = new PrimeService();
        }

        // [Fact]
        // public void IsPrime_InputIs1_ReturnFalse()
        // {
        //     var result = this.primeService.IsPrime(1);

        //     Assert.False(result, "1 should not be prime.");
        // }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        public void IsPrime_ValuesLessThan2_ReturnFalse(int value)
        {
            var result = this.primeService.IsPrime(value);

            Assert.False(result, $"{value} should not be prime");
        }
    }
}
