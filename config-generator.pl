#!/usr/bin/perl

use strict;
use warnings;
use Env;
use JSON;
use Scalar::Util qw(looks_like_number);

my $config = {};
foreach (sort keys %ENV) {
    my $env = $_;
    if ($env =~ m/^RAGE_/g) {
        my $value = $ENV{$env};
        $env =~ s/^RAGE_(.*)/$1/gm;
        $env =~ s/_/-/gm;

        if (looks_like_number($value) == 1) {
            $config->{lc($env)} = $value + 0;
        } else {
            $config->{lc($env)} = $value;
        }
        
    }
}
my $conf = JSON->new->pretty->encode($config);
print ($conf);
1;